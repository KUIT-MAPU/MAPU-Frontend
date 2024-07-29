import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import SideBar from '../../components/global/GlobalNavigationBar';
import HeaderNavigation from '../../components/timeLine/headerNavigation/HeaderNavigation';
import LeftBar from '../../components/timeLine/leftBar/LeftBar';
import SearchBar from '../../components/explore/SearchBar';
import SearchPopUp from '../../components/explore/SearchPopUp';
import useRegisterStore from '../../stores/registerStore';
import AuthContainer from '../../components/login/AuthContainer';
import MapList from '../../components/explore/MapList';
import { RegisterStatus } from '../../types/enum/RegisterStatus';
import mockData from '../../components/timeLine/mapList/MapModel';

import styles from './Explore.module.scss';
import dimmedStyles from '../../components/timeLine/Dimmed.module.scss';

import ico_title_arrow_down from '../../assets/ico_title_arrow_down.svg';
import { MapType } from '../../types/MapType';
const Explore: React.FC = () => {
  const [isCheck, setIsCheck] = useState<string>('random');
  const [text, setText] = useState<string>('');
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [mapData, setMapData] = useState<MapType[]>([]);
  const outside = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const { loginNeeded, registerStatus, setLoginNeeded } = useRegisterStore();
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);

  const fetchMapData = async () => {
    try {
      setMapData(mockData);
    } catch {
      console.error('error');
    }
  };

  const handleRandomBtn = () => {
    setIsCheck('random');
  };

  const handleRecentBtn = () => {
    setIsCheck('recent');
  };

  const handleMenuBtn = () => {
    setIsPopup(!isPopup);
  };

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `탐색 | MAPU`;
  }, []);

  useEffect(() => {
    if (registerStatus !== RegisterStatus.LOG_IN && loginNeeded) {
      setIsOverlayVisible(true);
    } else {
      setIsOverlayVisible(false);
    }
  }, [loginNeeded, registerStatus]);

  const handleClose = () => {
    setLoginNeeded(false);
    const prevUrl = pathname.split('?')[0];
    navigate(prevUrl);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (outside.current && !outside.current.contains(event.target as Node)) {
        setIsPopup(false);
      }
    };

    if (isPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopup]);

  useEffect(() => {
    fetchMapData();
  }, []);

  return (
    <>
      {isOverlayVisible && (
        <>
          <div className={dimmedStyles.background} onClick={handleClose} />
          <AuthContainer className={styles.authContainer} />
        </>
      )}

      <SideBar>
        <div className={styles.leftBarWrapper}>
          <LeftBar />
          <HeaderNavigation>
            <div className={styles.btnTitle}>
              {isCheck === 'random' && (
                <span className={styles.title}>랜덤순 탐색</span>
              )}
              {isCheck === 'recent' && (
                <span className={styles.title}>날짜순 탐색</span>
              )}
              <button className={styles.btnArrow} onClick={handleMenuBtn}>
                <img src={ico_title_arrow_down} alt="Arrow Down Icon" />
              </button>
              {isPopup && (
                <div ref={outside}>
                  <SearchPopUp
                    className={styles.searchModule}
                    isCheck={isCheck}
                    handleRandomBtn={handleRandomBtn}
                    handleRecentBtn={handleRecentBtn}
                  />
                </div>
              )}
            </div>
            <SearchBar
              className={styles.searchBar}
              text={text}
              setText={setText}
            />
            <div className={styles.main}>
              {mapData.map((map: MapType) => (
                <MapList map={map} />
              ))}
            </div>
          </HeaderNavigation>
        </div>
      </SideBar>
    </>
  );
};

export default Explore;
