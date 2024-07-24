import { useState } from 'react';
import { ObjectShape } from '../../../types/enum/ObjectShape';
import { ObjectOutline } from '../../../types/ObjectOutline';
import styles from './ObjectList.module.scss';
import ObjectOutlineBtn from './ObjectOutlineBtn';
import useMapInfoStore from '../../../stores/mapInfoStore';

const mockObjectList: ObjectOutline[] = [
  {
    objectId: 1,
    shape: ObjectShape.POINT,
    name: '용용선생',
  },
  {
    objectId: 2,
    shape: ObjectShape.LINE,
    name: '식후 건대 호수 한 바퀴',
  },
  {
    objectId: 3,
    shape: ObjectShape.LINE,
    name: '건대에서 어대까지',
  },
  {
    objectId: 4,
    shape: ObjectShape.PLANE,
    name: '중국집 거리',
  },
  {
    objectId: 11,
    shape: ObjectShape.POINT,
    name: '용용선생',
  },
  {
    objectId: 21,
    shape: ObjectShape.LINE,
    name: '식후 건대 호수 한 바퀴',
  },
  {
    objectId: 31,
    shape: ObjectShape.LINE,
    name: '건대에서 어대까지',
  },
  {
    objectId: 41,
    shape: ObjectShape.PLANE,
    name: '중국집 거리',
  },
  {
    objectId: 12,
    shape: ObjectShape.POINT,
    name: '용용선생',
  },
  {
    objectId: 22,
    shape: ObjectShape.LINE,
    name: '식후 건대 호수 한 바퀴',
  },
  {
    objectId: 32,
    shape: ObjectShape.LINE,
    name: '건대에서 어대까지',
  },
  {
    objectId: 42,
    shape: ObjectShape.PLANE,
    name: '중국집 거리',
  },
];

const ObjectList = () => {
  const [objectData, setObjectData] = useState<ObjectOutline[]>(mockObjectList);
  const { isMine } = useMapInfoStore();

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
        {objectData &&
          objectData.map((object) => <ObjectOutlineBtn object={object} />)}
      </div>
    </div>
  );
};

export default ObjectList;
