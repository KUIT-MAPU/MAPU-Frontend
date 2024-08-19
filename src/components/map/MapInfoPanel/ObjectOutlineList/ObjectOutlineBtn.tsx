import styles from './ObjectOutlineBtn.module.scss';
import { MapObject } from '../../../../types/map/object/ObjectInfo';
import { ObjectShape } from '../../../../types/enum/ObjectShape';
import Point from '../../../../assets/map/ico_point_gray.svg';
import Line from '../../../../assets/map/ico_line_gray.svg';
import Plane from '../../../../assets/map/ico_plane_gray.svg';
import useMapInfoStore from '../../../../stores/mapInfoStore';

interface Props {
  object: MapObject;
}

const ObjectOutlineBtn: React.FC<Props> = ({ object }) => {
  const { setSelectedObjectId, selectedObjectId } = useMapInfoStore();
  return (
    <button
      type="button"
      className={
        selectedObjectId === object.objectId
          ? `${styles.objectOutlineBtn} ${styles.selectedObjectOutlineBtn}`
          : styles.objectOutlineBtn
      }
      onClick={() => setSelectedObjectId(object.objectId)}
    >
      {object.type === ObjectShape.POINT ? (
        <img src={Point} alt="점 객체 아이콘" />
      ) : object.type === ObjectShape.LINE ? (
        <img src={Line} alt="선 객체 아이콘" />
      ) : (
        <img src={Plane} alt="면 객체 아이콘" />
      )}
      <span>{object.name}</span>
    </button>
  );
};

export default ObjectOutlineBtn;
