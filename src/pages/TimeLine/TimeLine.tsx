import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import HeaderNavigation from '../../components/timeLine/headerNavigation/HeaderNavigation';
import LeftBar from '../../components/timeLine/leftBar/LeftBar';
import { useKeywordStore } from '../../stores/keywordStore';
import useRegisterStore from '../../stores/registerStore';
import MapCard from '../../components/timeLine/mapCard/MapCard';
import { MapType } from '../../types/MapType';
import { KeywordMapType } from '../../types/keywords/KeywordMapType';
import { getFollowingMap } from '../../apis/mapData/getFollowingMap';
import { getKeywordMap } from '../../apis/keywords/getKeywordMap';
import mockData from '../../components/timeLine/mapCard/MapModel';

import styles from './TimeLine.module.scss';
import GlobalNavigationBar from '../../components/global/GlobalNavigationBar';
import { keywordMap } from '../../apis/keywords/keywordMap';
import { KeywordType } from '../../types/keywords/KeywordType';
import { MapsType } from '../../types/mapData/MapsType';
import { APIKeywordMapType } from '../../types/keywords/APIKeywordMapType';

const TimeLine: React.FC = () => {
  const [keywordMap, setKeywordMap] = useState<APIKeywordMapType[] | undefined>(undefined);
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

  useEffect(() => {
    const fetchData = async () => {
      const allResults: APIKeywordMapType[] = [];

      for (const keyword of selectedList) {
        const result = await getKeywordMap(keyword.title);
        if (result !== undefined) {
          allResults.push(...result);
        }
      }

      setKeywordMap(allResults !== undefined ? allResults : undefined); // 최종적으로 모인 데이터를 상태로 설정합니다.
    };

    fetchData();
  }, [selectedList]);

  useEffect(() => {
    console.log(keywordMap)
  },[keywordMap])


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

            {keywordMap ? (keywordMap.map((item:APIKeywordMapType) => {
              const keyword = item.keyword;
              const data = item.maps;
              return data.length > 0 ? (
                <MapCard 
                  key={Math.random()}
                  keyword={keyword}
                  mapData={data}
                  />
              ) : null
            })) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
