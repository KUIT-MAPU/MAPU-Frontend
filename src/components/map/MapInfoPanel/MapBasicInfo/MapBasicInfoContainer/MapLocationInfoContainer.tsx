import styles from './MapLocationInfoContainer.module.scss';
import useMapInfoStore from '../../../../../stores/mapInfoStore';

const MapLocationInfoContainer = () => {
  const { location, centerLatitude, centerLongitude } = useMapInfoStore();

  return (
    <div className={styles.locationInfoContainer}>
      <div className={styles.locationInfo}>
        <span className={styles.location__title}>위치</span>
        <span>{location}</span>
      </div>
      {/* TODO: 날씨, 미세/초미세 추후 목표로 보류 */}
      {/* <div className={styles.locationInfo}>
        <span className={styles.location__title}>날씨</span>
        <span>날씨 api 호출 결과</span>
      </div>
      <div className={styles.locationInfo}>
        <span className={styles.location__title}>미세/초미세</span>
        <span>미세먼지 api 호출 결과</span>
      </div> */}
    </div>
  );
};

export default MapLocationInfoContainer;
