import styles from './MapContentTitleContainer.module.scss';
import MapInfoInputContainer from './MapInfoInputContainer';
import LocationInfoContainer from './LocationInfoContainer';

interface Props {
  mode: string;
}

const MapContentTitleContainer: React.FC<Props> = ({ mode }) => {
  return (
    <div className={styles.mapContentTitleContainer}>
      <MapInfoInputContainer mode={mode} />
      <LocationInfoContainer />
    </div>
  );
};

export default MapContentTitleContainer;
