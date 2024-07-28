import React, { useEffect, useState } from 'react';
import HeaderNavigation from '../../components/timeLine/headerNavigation/HeaderNavigation';
import SideBar from '../../components/global/GlobalNavigationBar';
import LeftBar from '../../components/timeLine/leftBar/LeftBar';
import styles from './TimeLine.module.scss';
import useKeywordStore from '../../stores/keywordStore';
import useRegisterStore from '../../stores/registerStore';
import { RegisterStatus } from '../../types/enum/RegisterStatus';
import dimmedStyles from '../../components/timeLine/Dimmed.module.scss';
import AuthContainer from '../../components/login/AuthContainer';
import { useLocation, useNavigate } from 'react-router-dom';
import MapCard from '../../components/timeLine/mapList/MapCard';
import { MapType } from '../../types/MapType';
import mockData from '../../components/timeLine/mapList/MapModel';

const TimeLine:React.FC = () => {
  const [mapData, setMapData] = useState<{ [key: string]: MapType[] }>({});
  const [isLog, setIsLog] = useState<Boolean>(false);
  const { selectedList } = useKeywordStore();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const { loginNeeded, registerStatus, setLoginNeeded } = useRegisterStore();
  const [dimmed, setDimmed] = useState<boolean>(false);

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `홈 | MAPU`;
  }, []);

  useEffect(() => {
    if (registerStatus !== RegisterStatus.LOG_IN && loginNeeded) {
      setDimmed(true);
      setIsLog(false)
      console.log('setDimmed(true)');
    } else {
      setIsLog(true);
      setDimmed(false);
    }
  }, [loginNeeded, registerStatus]);

  
  const fetchMapData = async (keyword: string) => {
    try {
      // 실제 API 요청을 통해 키워드에 해당하는 데이터를 가져옵니다.
      // const keywordPromises = selectedList.map(keyword =>
      //   fetch(`https://api.yourservice.com/maps?keyword=${keyword.title}`)
      //     .then(response => response.json())
      //     .then(data => data) // 필요한 경우 데이터 가공
      // );
      // const data = await Promise.all(keywordPromises);
      const data = mockData.filter(map => map.keywords.includes(keyword)); // mockData에서 필터링
      setMapData(prevState => ({ ...prevState, [keyword]: data }));
    } catch {
      console.error(`Failed to fetch map data for keyword: ${keyword}`);
    }
  };

  useEffect(() => {
    selectedList.forEach(keyword => {
      fetchMapData(keyword.title);
    });
  }, [selectedList]);


  const handleClose = () => {
    setLoginNeeded(false);
    const prevUrl = pathname.split('?')[0];
    navigate(prevUrl);
  };

  return (
    <div className={styles.timeLineContainer}>
      {dimmed && (
        <div className={dimmedStyles.background} onClick={handleClose} />
      )}
      {dimmed && <AuthContainer className={styles.authContainer} />}
      <SideBar>
        <div className={styles.leftBarWrapper}>
          <LeftBar />
          <HeaderNavigation>
          {selectedList.map(keyword => (
              <MapCard key={keyword.id} keyword={keyword.title} mapData={mapData[keyword.title] || []} isLog={isLog} />
            ))}
          </HeaderNavigation>
        </div>
      </SideBar>
    </div>
  );
};

export default TimeLine;
