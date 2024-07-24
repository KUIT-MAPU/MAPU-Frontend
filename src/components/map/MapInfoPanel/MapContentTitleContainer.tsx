import styles from './MapContentTitleContainer.module.scss';
import MapInfoInputContainer from './MapInfoInputContainer';
import LocationInfoContainer from './LocationInfoContainer';

const MapContentTitleContainer = () => {
  return (
    <div className={styles.mapContentTitleContainer}>
      <MapInfoInputContainer />
      <LocationInfoContainer />
    </div>
  );
};

export default MapContentTitleContainer;
