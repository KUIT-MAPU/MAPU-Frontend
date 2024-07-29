import styles from './AddPropertyPopUp.module.scss';

const AddPropertyPopUp = () => {
  return (
    <div className={styles.addPropertyPopUp}>
      <button type="button" className={styles.addPropertyBtn}>
        객체 연결 추가
      </button>
      <button type="button" className={styles.addPropertyBtn}>
        태그 추가
      </button>
      <button type="button" className={styles.addPropertyBtn}>
        별점 추가
      </button>
    </div>
  );
};

export default AddPropertyPopUp;
