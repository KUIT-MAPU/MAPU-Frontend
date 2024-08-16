import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import HeaderNavigation from '../../components/timeLine/headerNavigation/HeaderNavigation';
import LeftBar from '../../components/timeLine/leftBar/LeftBar';
import { useKeywordStore } from '../../stores/keywordStore';
import useRegisterStore from '../../stores/registerStore';
import MapCard from '../../components/timeLine/mapCard/MapCard';
import { MapType } from '../../types/MapType';
import { getFollowingMap } from '../../apis/mapData/getFollowingMap';
import { getKeywordMap } from '../../apis/keywords/getKeywordMap';
import mockData from '../../components/timeLine/mapCard/MapModel';

import styles from './TimeLine.module.scss';
import GlobalNavigationBar from '../../components/global/GlobalNavigationBar';

const TimeLine: React.FC = () => {
  const [mapData, setMapData] = useState<{ [key: string]: MapType[] }>({});
  const [isLog, setIsLog] = useState<boolean>(false);
  const { selectedList } = useKeywordStore();
  const token = useRegisterStore((state) => state.accessToken);

  const { data: followingMapData } = useQuery(['followingMapData', token], () =>
    getFollowingMap(token),
  );

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `홈 | MAPU`;
  }, []);

  useEffect(() => {
    setIsLog(!!token);
    console.log('timeline followingmap', followingMapData);
  }, [token]);

  // const fetchMapData = async (keyword: string) => {
  //   try {
  //     const data = mockData.filter((map) => map.keywords.includes(keyword)); // mockData에서 필터링
  //     setMapData((prevState) => ({ ...prevState, [keyword]: data }));
  //   } catch {
  //     console.error(`Failed to fetch map data for keyword: ${keyword}`);
  //   }
  // };

  useEffect(() => {
    selectedList.forEach((keyword) => {
      console.log(keyword);
      getKeywordMap(keyword.title);
    });
  }, [selectedList]);

  return (
    <div className={styles.timeLineContainer}>
      <GlobalNavigationBar />
      <div className={styles.main}>
        <LeftBar token={token} isLog={isLog} />
        <div className={styles.TimelineMain}>
          <HeaderNavigation />
          <div className={styles.mapMain}>
            {followingMapData ? (
              followingMapData.map((item) => {
                const nickname = item.nickname;
                const data = item.maps;

                return data.length > 0 ? (
                  <MapCard
                    key={item.profileId}
                    keyword={`${nickname} 님의 지도`}
                    followingMap={data}
                    userInfo = {item}
                  />
                ) : null;
              })
            ) : (
              null
            )}

            {selectedList.map((keyword) => {
              const data = mapData[keyword.title] || [];
              return data.length > 0 ? (
                <MapCard
                  key={keyword.id}
                  keyword={keyword.title}
                  mapData={data}
                />
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
