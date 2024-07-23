import { useEffect, useState } from 'react';
import styles from './MapInfoPanel.module.scss';
import BlackBackBtn from '../../../assets/back-arrow-black.svg';
import { useNavigate } from 'react-router-dom';
import MapProducerConatiner from './MapProducerContainer';
import MapContentTitle from './MapContentTitleContainer';
import useMapInfoStore from '../../../stores/mapInfoStore';

const MapInfoPanel = () => {
  const { isMine } = useMapInfoStore();

  const navigate = useNavigate();

  useEffect(() => {
    //TODO: 내가 제작한 지도인지 판단
    //아니라면
    //1. 상단에 지도 제작자 프로필 표시
    //2. 팔로잉 중인지 판단
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <section id={styles.mapInfoPanel}>
      <div className={styles.header}>
        <button type="button">
          <img src={BlackBackBtn} alt="뒤로가기 버튼" onClick={handleGoBack} />
        </button>
      </div>
      {!isMine && <MapProducerConatiner />}
      <MapContentTitle />
    </section>
  );
};

export default MapInfoPanel;
