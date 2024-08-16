import React, { useState, useEffect } from 'react';

import styles from './NewMap.module.scss';
import { ReactComponent as ModalClose } from '../../../assets/btn_followmodal_close.svg';
import { ReactComponent as NewMapIcon } from '../../../assets/ico_newmap.svg';
import axios from 'axios';

const { kakao } = window;

const NewMap = ({ onClose }: { onClose: () => void }) => {
  const [location, setLocation] = useState<string>('');
  const [mapTitle, setMapTitle] = useState<string>('');
  const [mapDescription, setMapDescription] = useState<string>('');
  const [imageUrl, setImageUrl] =useState<string>('');
  const [mapCreate, setMapCreate] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number | null>(null); //위도(기본값 null)
  const [longtitude, setLongtitude] = useState<number | null>(null); //경도(기본값 null)
  const [zoomLevel, setZoomLever] = useState<number>(0);
  const [isOnSearch, setIsOnSearch] = useState<boolean>(true);
  const [keywords,setKeywords] = useState<string[]>([]);

  const getButtonStyle = (buttonLocation: string) => {
    return location === buttonLocation
      ? `${styles.selectedButton}`
      : `${styles.defaultButton}`;
  };

  const getInputTextStyle = () => {
    return mapTitle ? `${styles.filledInput}` : `${styles.emptyInput}`;
  };

  useEffect(() => {
    if (location && mapTitle) {
      setMapCreate(true);
    } else {
      setMapCreate(false);
    }
  }, [location, mapTitle]);

  const getMapCreateStyle = () => {
    return mapCreate ? `${styles.onMapCreate}` : `${styles.offMapCreate}`;
  };

  const handleCurrentLocation = () => {
    setLocation('현재 위치');
    kakao.maps.load(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLatitude(lat);
          setLongtitude(lon);
          console.log(lat, lon);
        });
      } else {
        alert('현재 위치 사용 불가');
      }
    });
  };

  const sendDataToBackend = async (data:any) => {
    try {
      const response = await axios.post('/map/create', data);
      console.log('Data sent successfully:', response.data);
    } catch (error) {
      console.error('Failed to send data:', error);
    }
  };
  
  // 예를 들어, form 데이터를 백엔드로 전송
  const handleSubmit = (event:any) => {
    event.preventDefault();
    
    if(!mapTitle || !latitude || !longtitude){
      alert('모든 필수 정보를 입력해주세요');
      return;
    }
    const formData = {
      mapTitle,
      mapDescription,
      address: location,
      latitude,
      longtitude,
      zoomLevel,
      publishLink : imageUrl, // 예시에서는 imageUrl로 대체
      isOnSearch,
      keywords,
    };
  
    sendDataToBackend(formData);
  };
  
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalTop}>
          <NewMapIcon />
          <button className={styles.closeButton} onClick={onClose}>
            <ModalClose />
          </button>
        </div>
        <div className={styles.mapTitleText}>지도 이름</div>
        <div className={styles.mapTitle}>
          <input
            type="text"
            className={`${styles.mapTitleInput} ${getInputTextStyle()}`}
            value={mapTitle}
            onChange={(e) => setMapTitle(e.target.value)} // 입력 값 업데이트
            placeholder="지도 이름 입력"
          />
        </div>
        <div className={styles.mapStartText}>시작 위치</div>
        <div className={styles.btnLocation}>
          <button
            className={getButtonStyle('현재 위치')}
            onClick={handleCurrentLocation}
          >
            현재 위치
          </button>
          <button
            className={getButtonStyle('전국')}
            onClick={() => setLocation('전국')}
          >
            전국
          </button>
          <button
            className={getButtonStyle('광역자치단체')}
            onClick={() => setLocation('광역자치단체')}
          >
            광역자치단체
          </button>
        </div>
        <div className={`${styles.createBtn} ${getMapCreateStyle()}`}>
          <div 
            role="button" 
          onClick={handleSubmit}>생성하기</div>
        </div>
      </div>
    </div>
  );
};

export default NewMap;
