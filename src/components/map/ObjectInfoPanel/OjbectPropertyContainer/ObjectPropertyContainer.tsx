import styles from './ObjectPropertyContainer.module.scss';
import publicStyles from '../ObjectContainerPublicStyle.module.scss';
import AddPropertyPopUp from './AddPropertyPopUp';
import PlusBtn from '../../../../assets/btn_plus_black.svg';
import useMapInfoStore from '../../../../stores/mapInfoStore';
import { ObjectShape } from '../../../../types/enum/ObjectShape';

interface Props {
  mode: string;
  shape: ObjectShape;
}

const OjbectPropertyContainer: React.FC<Props> = ({ mode, shape }) => {
  const { showAddPropertPopUp, switchShowAddPropertPopUp } = useMapInfoStore();

  const handleAddProperty = (event: React.MouseEvent) => {
    event.stopPropagation();
    switchShowAddPropertPopUp(true);
  };

  const getContainerClassName = () => {
    if (mode === 'edit') {
      switch (shape) {
        case ObjectShape.POINT:
          return `${styles.objectPropertyContainer} ${styles.editorPointContainer}`;
        case ObjectShape.LINE:
          return `${styles.objectPropertyContainer} ${styles.editorLineContainer}`;
        default:
          return `${styles.objectPropertyContainer} ${styles.editorPlainContainer}`;
      }
    } else {
      switch (shape) {
        case ObjectShape.POINT:
          return `${styles.objectPropertyContainer} ${styles.viewerPointContainer}`;
        case ObjectShape.LINE:
          return `${styles.objectPropertyContainer} ${styles.viewerLineContainer}`;
        default:
          return `${styles.objectPropertyContainer} ${styles.viewerPlainContainer}`;
      }
    }
  };

  return (
    <section className={getContainerClassName()}>
      <div className={styles.propertyContainerTitleBox}>
        <span className={publicStyles.boxTitle}>객체 정보 속성</span>
        {mode === 'edit' && (
          <button
            type="button"
            onClick={handleAddProperty}
            className={styles.plusBtnContainer}
          >
            <img src={PlusBtn} alt="속성 추가" />
          </button>
        )}
        {showAddPropertPopUp && <AddPropertyPopUp />}
      </div>
      <div className={styles.objectPropertyList}></div>
    </section>
  );
};

export default OjbectPropertyContainer;
