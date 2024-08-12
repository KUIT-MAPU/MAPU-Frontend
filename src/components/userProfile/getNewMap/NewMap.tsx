import styles from './NewMap.module.scss';
import { ReactComponent as ModalClose } from '../../../assets/btn_followmodal_close.svg';
import { ReactComponent as NewMapIcon } from '../../../assets/ico_newmap.svg';

const NewMap = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalTop}>
          <NewMapIcon />
          <button className={styles.closeButton} onClick={onClose}>
            <ModalClose />
          </button>
        </div>
        <div className={styles.searchBar}>
          <div className={styles.searchBarText}>
            <div>텍스트</div>
          </div>
        </div>
        <div className={styles.createBtn}>
          <div>텍스트</div>
        </div>
      </div>
    </div>
  );
};

export default NewMap;
