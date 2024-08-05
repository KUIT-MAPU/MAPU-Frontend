import styles from './ObjectList.module.scss';
import ObjectOutlineBtn from './ObjectOutlineBtn';
import useMapInfoStore from '../../../../stores/mapInfoStore';

const ObjectList = () => {
  const { isMine, objectOutlineList } = useMapInfoStore();

  return (
    <div className={styles.objectListContainer}>
      <div className={styles.objectList__header}>
        <span>객체 생성 순</span>
      </div>
      <div
        className={
          isMine
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
