import { useEffect, useState } from 'react';
import styles from './MapContentTitleContainer.module.scss';
import MapInfoInputContainer from './MapInfoInputContainer';
import LocationInfoContainer from './LocationInfoContainer';

interface Props {
  isMine: boolean;
}

const MapContentTitleContainer: React.FC<Props> = ({ isMine }) => {
  const [error, setError] = useState<string | null>(null);

  const fetchMapInfo = async () => {
    try {
      //TODO: 지도 정보 api 호출
    } catch (error) {
      setError('지도 정보를 불러올 수 없음.');
    }
  };

  useEffect(() => {
    fetchMapInfo();
  }, []);

  return (
    <div className={styles.mapContentTitleContainer}>
      <MapInfoInputContainer />
      <LocationInfoContainer />
    </div>
  );
};

export default MapContentTitleContainer;
