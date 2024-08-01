import styles from './ObjectPropertyBox.module.scss';
import { ObjectOutline } from '../../../../types/map/object/ObjectOutline';
import { ObjectPropertyType } from '../../../../types/enum/ObjectPropertyType';
import { StarRating } from '../../../../types/map/object/StarRating';

interface Props {
  type: ObjectPropertyType;
  values: ObjectOutline[] | string[] | StarRating[];
}

const ObjectPropertyBox: React.FC<Props> = ({ type, values }) => {
  //connections
  if (type === ObjectPropertyType.CONNECTION)
    return (
      <div className={styles.objectPropertyBox}>object connections</div>
    );

  //tags
  if (type === ObjectPropertyType.TAG)
    return <div className={styles.objectPropertyBox}>tags</div>;

  //star ratings
  return <div className={styles.objectPropertyBox}>star rating</div>;
};

export default ObjectPropertyBox;
