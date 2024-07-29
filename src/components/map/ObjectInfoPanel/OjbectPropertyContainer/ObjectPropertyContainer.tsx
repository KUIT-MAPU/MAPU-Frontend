import styles from './ObjectPropertyContainer.module.scss';
import publicStyles from '../ObjectContainerPublicStyle.module.scss';
import AddPropertyPopUp from './AddPropertyPopUp';
import PlusBtn from '../../../../assets/btn_plus_black.svg';
import useMapInfoStore from '../../../../stores/mapInfoStore';

interface Props {
  mode: string;
}

const OjbectPropertyContainer: React.FC<Props> = ({ mode }) => {
  const { showAddPropertPopUp, switchShowAddPropertPopUp } = useMapInfoStore();

  const handleAddProperty = (event: React.MouseEvent) => {
    event.stopPropagation();
    switchShowAddPropertPopUp(true);
  };

  return (
    <section>
      <div className={styles.propertyContainerTitleBox}>
        <span className={publicStyles.boxTitle}>객체 정보 속성</span>
        {mode === 'edit' && (
          <button type="button" onClick={handleAddProperty}>
            <img src={PlusBtn} alt="속성 추가" />
          </button>
        )}
        {showAddPropertPopUp && <AddPropertyPopUp />}
      </div>
    </section>
  );
};

export default OjbectPropertyContainer;
