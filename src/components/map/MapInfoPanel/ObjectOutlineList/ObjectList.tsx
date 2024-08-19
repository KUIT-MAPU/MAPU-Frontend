import styles from './ObjectList.module.scss';
import ObjectOutlineBtn from './ObjectOutlineBtn';
import useMapInfoStore from '../../../../stores/mapInfoStore';

const ObjectList = () => {
  const { mapInfo, innerData } = useMapInfoStore();

  return (
    <div className={styles.objectListContainer}>
      <div className={styles.objectList__header}>
        <span>객체 생성 순</span>
      </div>
      <div
        className={
          mapInfo.isMine
            ? `${styles.objectList}`
            : `${styles.objectList} ${styles.notMineList}`
        }
      >
        {innerData.objects &&
          innerData.objects.map((object) => (
            <ObjectOutlineBtn object={object} key={object.objectId} />
          ))}
      </div>
    </div>
  );
};

export default ObjectList;
