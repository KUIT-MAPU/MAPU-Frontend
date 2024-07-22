import { useNavigate } from 'react-router-dom';
import styles from './MapInfoInputContainer.module.scss';
import { MapInfo } from '../../../types/MapInfo';

interface Props {
  mapInfo: MapInfo;
  setMapInfo: React.Dispatch<React.SetStateAction<MapInfo>>;
}

const MapInfoInputContainer: React.FC<Props> = ({ mapInfo, setMapInfo }) => {
  const navigate = useNavigate();

  const handleTitleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMapInfo = { ...mapInfo, title: e.currentTarget.value };
    setMapInfo(newMapInfo);
  };

  const handleDescriptionOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newMapInfo = { ...mapInfo, description: e.currentTarget.value };
    setMapInfo(newMapInfo);
  };

  const handleFocusOutTitle = () => {
    //TODO: 지도 제목 저장 api 호출, 응답으로 받은 지도 제목 사용
    navigate(`/map/${mapInfo.title.replaceAll(' ', '-')}`);
  };

  const handleFocusOutDescription = () => {
    //TODO: 지도 설명 저장 api 호출
  };

  return (
    <div className={styles.mapInfoInputContainer}>
      <input
        type="text"
        name="mapTitle"
        id={styles.mapTitle}
        value={mapInfo.title}
        placeholder="지도 이름"
        onChange={handleTitleOnChange}
        onBlur={handleFocusOutTitle}
      />
      <textarea
        name="mapDescription"
        id={styles.mapDescription}
        placeholder="지도 설명"
        value={mapInfo.description}
        onChange={handleDescriptionOnChange}
        onBlur={handleFocusOutDescription}
      />
    </div>
  );
};

export default MapInfoInputContainer;
