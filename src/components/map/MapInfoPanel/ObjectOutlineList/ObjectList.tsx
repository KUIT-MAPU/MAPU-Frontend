import styles from './ObjectList.module.scss';
import ObjectOutlineBtn from './ObjectOutlineBtn';
import useMapInfoStore from '../../../../stores/mapInfoStore';
import { useMapBasicInfoQuery } from '../../../../apis/Map/fetchMapBasicInfo';
import { MapMode } from '../../../../types/enum/MapMode';

interface Props {
  mode: MapMode;
  mapId: number;
}

const ObjectList: React.FC<Props> = ({ mode, mapId }) => {
  const { objectOutlineList } = useMapInfoStore();
  const { mapBasicInfo } = useMapBasicInfoQuery(mapId, mode);

  return (
    <div className={styles.objectListContainer}>
      <div className={styles.objectList__header}>
        <span>객체 생성 순</span>
      </div>
      <div
        className={
          mapBasicInfo !== undefined && mapBasicInfo!.result.mine
            ? `${styles.objectList}`
            : `${styles.objectList} ${styles.notMineList}`
        }
      >
        {objectOutlineList &&
          objectOutlineList.map((object) => (
            <ObjectOutlineBtn object={object} />
          ))}
      </div>
    </div>
  );
};

export default ObjectList;
