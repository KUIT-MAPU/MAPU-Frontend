import { getTsid } from 'tsid-ts';
import styles from './AddPropertyPopUp.module.scss';
import useMapInfoStore from '../../../../stores/mapInfoStore';
import { ObjectPropertyType } from '../../../../types/enum/ObjectPropertyType';
import { InfoAttribute } from '../../../../types/map/object/ObjectInfo';

const AddPropertyPopUp = () => {
  const { doc } = useMapInfoStore();
  const handleAddProperty = (type: ObjectPropertyType) => {
    const id = getTsid().toString();
    doc?.update((root) => {
      root.informationAttributes.push({
        id: id,
        name: '',
        type: type,
      });
    }, `Add information attribute ${id}(${type})`);
  };

  return (
    <div className={styles.addPropertyPopUp}>
      <button
        type="button"
        className={styles.addPropertyBtn}
        onClick={() => handleAddProperty(ObjectPropertyType.CONNECTION)}
        disabled={true}
      >
        연결 추가(업데이트 예정)
      </button>
      <button
        type="button"
        className={styles.addPropertyBtn}
        disabled={
          doc
            ?.getRoot()
            .informationAttributes.find(
              (attr: InfoAttribute) => attr.type === ObjectPropertyType.TAG,
            )
            ? true
            : false
        }
        onClick={() => handleAddProperty(ObjectPropertyType.TAG)}
      >
        태그 추가
      </button>
      <button
        type="button"
        className={styles.addPropertyBtn}
        onClick={() => handleAddProperty(ObjectPropertyType.STAR_RATING)}
        disabled={true}
      >
        별점 추가(업데이트 예정)
      </button>
    </div>
  );
};

export default AddPropertyPopUp;
