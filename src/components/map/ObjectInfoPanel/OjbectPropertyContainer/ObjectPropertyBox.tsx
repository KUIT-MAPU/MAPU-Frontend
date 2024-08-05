import styles from './ObjectPropertyBox.module.scss';
import { ObjectOutline } from '../../../../types/map/object/ObjectOutline';
import { ObjectPropertyType } from '../../../../types/enum/ObjectPropertyType';
import { StarRating } from '../../../../types/map/object/StarRating';
import MenuBtn from '../../../../assets/btn_menu_gray.svg';

interface Props {
  type: ObjectPropertyType;
  values: ObjectOutline[] | string[] | StarRating[];
}

const ObjectPropertyBox: React.FC<Props> = ({ type, values }) => {
  //connections
  if (type === ObjectPropertyType.CONNECTION)
    return (
      <div className={styles.objectPropertyBox}>
        <div className={styles.propertyTitleContainer}>
          <span className={styles.propertyTitle}>객체 연결</span>
          <button type="button" className={styles.propertyMenuBtn}>
            <img src={MenuBtn} alt="메뉴" />
          </button>
        </div>
        <div className={styles.propertyBox}></div>
      </div>
    );

  //tags
  if (type === ObjectPropertyType.TAG)
    return (
      <div className={styles.objectPropertyBox}>
        <div className={styles.propertyTitleContainer}>
          <span className={styles.propertyTitle}>태그</span>
          <button type="button" className={styles.propertyMenuBtn}>
            <img src={MenuBtn} alt="메뉴" />
          </button>
        </div>
        <div className={styles.propertyBox}></div>
      </div>
    );

  //star ratings
  return (
    <div className={styles.objectPropertyBox}>
      <div className={styles.propertyTitleContainer}>
        <span className={styles.propertyTitle}>별점</span>
        <button type="button" className={styles.propertyMenuBtn}>
          <img src={MenuBtn} alt="메뉴" />
        </button>
      </div>
      <div className={styles.propertyBox}></div>
    </div>
  );
};

export default ObjectPropertyBox;
