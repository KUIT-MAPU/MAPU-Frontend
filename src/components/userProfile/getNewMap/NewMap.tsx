import React, {useState} from 'react';

import styles from './NewMap.module.scss';
import { ReactComponent as ModalClose } from '../../../assets/btn_followmodal_close.svg';
import { ReactComponent as NewMapIcon } from '../../../assets/ico_newmap.svg';

const NewMap = ({ onClose }: { onClose: () => void }) => {

  const [location,setLocation] = useState('현재 위치');

  const getButtonStyle = (buttonLocation : string) => {
    return location===buttonLocation
    ? `${styles.selectedButton}`
    : `${styles.defaultButton}`;
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
          <div className={styles.mapTitleInput}>
            <div>텍스트</div>
          </div>
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
        <div className={styles.createBtn}>
          <div>생성하기</div>
        </div>
      </div>
    </div>
  );
};

export default NewMap;
