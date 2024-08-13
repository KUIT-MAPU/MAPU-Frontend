import React, {useState,useEffect} from 'react';

import styles from './NewMap.module.scss';
import { ReactComponent as ModalClose } from '../../../assets/btn_followmodal_close.svg';
import { ReactComponent as NewMapIcon } from '../../../assets/ico_newmap.svg';

const NewMap = ({ onClose }: { onClose: () => void }) => {

  const [location,setLocation] = useState<string>('');
  const [mapTitle,setMapTitle] = useState<string>('');
  const [mapCreate,setMapCreate] = useState<boolean>(false);

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
          onClick={() => setLocation('현재 위치')}>현재 위치</button>
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
