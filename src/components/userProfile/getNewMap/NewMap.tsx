import React, {useState,useEffect} from 'react';

import styles from './NewMap.module.scss';
import { ReactComponent as ModalClose } from '../../../assets/btn_followmodal_close.svg';
import { ReactComponent as NewMapIcon } from '../../../assets/ico_newmap.svg';

const {kakao} = window;

const NewMap = ({ onClose }: { onClose: () => void }) => {

  const [location,setLocation] = useState<string>('');
  const [mapTitle,setMapTitle] = useState<string>('');
  const [mapCreate,setMapCreate] = useState<boolean>(false);
  const [latitude,setLatitude] = useState<number | null>(null); //위도(기본값 null)
  const [longtitude,setLongtitude] = useState<number | null>(null); //경도(기본값 null)

  const getButtonStyle = (buttonLocation : string) => {
    return location===buttonLocation
    ? `${styles.selectedButton}`
    : `${styles.defaultButton}`;
  }

  const getInputTextStyle = () => {
    return mapTitle ? `${styles.filledInput}` : `${styles.emptyInput}`;
  };

  useEffect(() => {
    if(location && mapTitle) {
      setMapCreate(true);
    } else{
      setMapCreate(false);
    }
  },[location,mapTitle]);

  const getMapCreateStyle = () => {
    return mapCreate ? `${styles.onMapCreate}` : `${styles.offMapCreate}`;
  }
  
  const handleCurrentLocation = () => {
    setLocation('현재 위치');
    kakao.maps.load(() => {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat=position.coords.latitude;
          const lon=position.coords.longitude;
          setLatitude(lat);
          setLongtitude(lon);
          console.log(lat,lon);
        });
      } else{
        alert('현재 위치 사용 불가');
      }
    })
  }

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
          onClick={handleCurrentLocation}>현재 위치</button>
          <button 
          className={getButtonStyle('전국')}
          onClick={() => setLocation('전국')}>전국</button>
          <button 
          className={getButtonStyle('광역자치단체')}
          onClick={() => setLocation('광역자치단체')}>광역자치단체</button>
        </div>
        <div className={`${styles.createBtn} ${getMapCreateStyle()}`}>
          <div>생성하기</div>
        </div>
      </div>
    </div>
  );
};

export default NewMap;
