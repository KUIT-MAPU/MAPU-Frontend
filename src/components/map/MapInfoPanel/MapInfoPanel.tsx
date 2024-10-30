import { useNavigate } from 'react-router-dom';
import styles from './MapInfoPanel.module.scss';
import MapProducerConatiner from './MapBasicInfo/MapProducerContainer/MapProducerContainer';
import MapBasicInfoContainer from './MapBasicInfo/MapBasicInfoContainer/MapBasicInfoContainer';
import ObjectList from './ObjectOutlineList/ObjectList';
import { MapMode } from '../../../types/enum/MapMode';
import BlackBackBtn from '../../../assets/btn_arrow_left_black.svg';
import useRegisterStore from '../../../stores/registerStore';
import { useMapBasicInfoQuery } from '../../../apis/Map/fetchMapBasicInfo';

interface Props {
  mode: MapMode;
  mapId: number;
}

const MapInfoPanel: React.FC<Props> = ({ mode, mapId }) => {
  const navigate = useNavigate();
  const { loginNeeded } = useRegisterStore();
  const { mapBasicInfo } = useMapBasicInfoQuery(mapId, mode);

  const handleGoBack = () => {
    navigate(-1);
  };

  //viewer
  if (mode == MapMode.VIEW)
    return (
      <section id={styles.mapInfoPanel}>
        <div className={styles.header}>
          <button type="button">
            <img
              src={BlackBackBtn}
              alt="뒤로가기 버튼"
              onClick={handleGoBack}
            />
          </button>
        </div>
        <MapProducerConatiner mode={mode} mapId={mapId} />
        <MapBasicInfoContainer mode={mode} mapId={mapId} />
        <ObjectList mode={mode} mapId={mapId} />
      </section>
    );

  //editor
  if (mode === MapMode.EDIT)
    return (
      <section id={styles.mapInfoPanel}>
        <div className={styles.header}>
          <button type="button">
            <img
              src={BlackBackBtn}
              alt="뒤로가기 버튼"
              onClick={handleGoBack}
            />
          </button>
        </div>
        {mapBasicInfo !== undefined && !mapBasicInfo.result.mine && (
          <MapProducerConatiner mode={mode} mapId={mapId} />
        )}
        <MapBasicInfoContainer mode={mode} mapId={mapId} />
        {!loginNeeded && <ObjectList mode={mode} mapId={mapId} />}
      </section>
    );

  //잘못된 모드
  return <></>;
};

export default MapInfoPanel;
