import styles from './MapBasicInfoContainer.module.scss';
import MapTitleAndDescriptionInputContainer from './MapTitleAndDescriptionInputContainer';
import LocationInfoContainer from './MapLocationInfoContainer';
import { MapMode } from '../../../../../types/enum/MapMode';

interface Props {
  mode: MapMode;
}

const MapBasicInfoContainer: React.FC<Props> = ({ mode }) => {
  return (
    <div className={styles.mapContentTitleContainer}>
      <MapTitleAndDescriptionInputContainer mode={mode} />
      <LocationInfoContainer />
    </div>
  );
};

export default MapBasicInfoContainer;
