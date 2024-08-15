import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import HeaderNavigation from '../../components/timeLine/headerNavigation/HeaderNavigation';
import LeftBar from '../../components/timeLine/leftBar/LeftBar';
import { useKeywordStore } from '../../stores/keywordStore';
import useRegisterStore from '../../stores/registerStore';
import { RegisterStatus } from '../../types/enum/RegisterStatus';
import AuthContainer from '../../components/login/AuthContainer';
import MapCard from '../../components/timeLine/mapCard/MapCard';
import { MapType } from '../../types/MapType';
import mockData from '../../components/timeLine/mapCard/MapModel';

import styles from './TimeLine.module.scss';
import dimmedStyles from '../../components/timeLine/Dimmed.module.scss';
import GlobalNavigationBar from '../../components/global/GlobalNavigationBar';

const TimeLine: React.FC = () => {
  const [mapData, setMapData] = useState<{ [key: string]: MapType[] }>({});
  const [isLog, setIsLog] = useState<boolean>(false);
  const { selectedList } = useKeywordStore();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const { loginNeeded, registerStatus, setLoginNeededStatus } = useRegisterStore();
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `홈 | MAPU`;
  }, []);

  useEffect(() => {
    if (registerStatus !== RegisterStatus.LOG_IN && loginNeeded) {
      setIsOverlayVisible(true);
      setIsLog(false);
      console.log('setDimmed(true)');
    } else {
      setIsLog(true);
      setIsOverlayVisible(false);
    }
  }, [loginNeeded, registerStatus]);

  const fetchMapData = async (keyword: string) => {
    try {
      const data = mockData.filter((map) => map.keywords.includes(keyword)); // mockData에서 필터링
      setMapData((prevState) => ({ ...prevState, [keyword]: data }));
    } catch {
      console.error(`Failed to fetch map data for keyword: ${keyword}`);
    }
  };

  useEffect(() => {
    selectedList.forEach((keyword) => {
      fetchMapData(keyword.title);
    });
  }, [selectedList]);

  const handleClose = () => {
    setLoginNeededStatus(false);
    const prevUrl = pathname.split('?')[0];
    navigate(prevUrl);
  };

  return (
    <div className={styles.timeLineContainer}>
      {isOverlayVisible && (
        <>
          <div className={dimmedStyles.background} onClick={handleClose} />
          <AuthContainer className={styles.authContainer} />
        </>
      )}

      <GlobalNavigationBar />
      <div className={styles.main}>
        <LeftBar />
        <div className={styles.TimelineMain}>
          <HeaderNavigation />
            <div className={styles.mapMain}>
              {selectedList.map((keyword) => {
                const data = mapData[keyword.title] || [];
                return data.length > 0 ? (
                  <MapCard
                    key={keyword.id}
                    keyword={keyword.title}
                    mapData={data}
                    isLog={isLog}
                  />
                ) : null;
              })}
            </div>
          {/* </HeaderNavigation> */}
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
