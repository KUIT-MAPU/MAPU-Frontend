import { useEffect, useState } from 'react';
import styles from './MapContentTitleContainer.module.scss';
import { MapInfo } from '../../../types/MapInfo';
import MapInfoInputContainer from './MapInfoInputContainer';
import LocationInfoContainer from './LocationInfoContainer';

const mockMapData: MapInfo = {
  mapId: 1,
  title: '건대 맛집 지도',
  description: '', //건대 졸업생이 만든 건대 맛의 거리 중 맛집을 모아둔 지도입니다~~~~~!!
  location: '서울시 광진구',
  latitude: 44.34,
  longitude: 10.99,
  isPublished: false,
};

const MapContentTitleContainer = () => {
  const [mapInfo, setMapInfo] = useState<MapInfo>({
    mapId: 1,
    title: '',
    description: '',
    location: '',
    latitude: 0.0,
    longitude: 0.0,
    isPublished: false,
  });
  const [error, setError] = useState<string | null>(null);

  const fetchMapInfo = async () => {
    try {
      setMapInfo(mockMapData); //TODO: 지도 정보 api 호출
    } catch (error) {
      setError('지도 정보를 불러올 수 없음.');
    }
  };

  useEffect(() => {
    fetchMapInfo();
  }, []);

  return (
    <div className={styles.mapContentTitleContainer}>
      <MapInfoInputContainer mapInfo={mapInfo} setMapInfo={setMapInfo} />
      <LocationInfoContainer mapInfo={mapInfo} />
    </div>
  );
};

export default MapContentTitleContainer;
