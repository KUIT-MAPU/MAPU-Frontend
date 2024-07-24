import styles from './ObjectOutlineBtn.module.scss';
import { ObjectOutline } from '../../../types/ObjectOutline';
import { ObjectShape } from '../../../types/enum/ObjectShape';
import Point from '../../../assets/map/ico_point_gray.svg';
import Line from '../../../assets/map/ico_line_gray.svg';
import Plane from '../../../assets/map/ico_plane_gray.svg';

interface Props {
  object: ObjectOutline;
}

const ObjectOutlineBtn: React.FC<Props> = ({ object }) => {
  return (
    <button type="button" className={styles.objectOutlineBtn}>
      {object.shape === ObjectShape.POINT ? (
        <img src={Point} alt="점 객체 아이콘" />
      ) : object.shape === ObjectShape.LINE ? (
        <img src={Line} alt="선 객체 아이콘" />
      ) : (
        <img src={Plane} alt="면 객체 아이콘" />
      )}
      <span>{object.name}</span>
    </button>
  );
};

export default ObjectOutlineBtn;
