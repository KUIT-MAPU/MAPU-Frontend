import { useState } from 'react';
import styles from './EditorObjectInfoInputContainer.module.scss';
import publicStyles from './ObjectContainerPublicStyle.module.scss';

const EditorObjectInfoInputContainer = () => {
  const [editedTitle, setEditedTitle] = useState<string>('작업하기 좋은 카페');
  const [isTitleEmpty, setIsTitleEmpty] = useState<boolean>(false);
  const [editedDetailAddress, setEditedDetailAddress] =
    useState<string>('작은 틈새로 들어가는 문');

  const handleTitleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.currentTarget.value);
  };

  const handleDetailAddressOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setEditedDetailAddress(e.currentTarget.value);
  };

  const handleFocusOutTitle = () => {
    if (editedTitle === '' || editedTitle === null) {
      setIsTitleEmpty(true);
    } else {
      //TODO: 객체 이름 저장 api 호출
      setIsTitleEmpty(false);
    }
  };

  const handleFocusOutDetailAddress = () => {
    //TODO: 객체 상세 주소 저장 api 호출
  };

  return (
    <section className={styles.editorObjectInfoInputContainer}>
      <div className={styles.inputTitleContainer}>
        <span className={publicStyles.boxTitle}>이름</span>
        <input
          type="text"
          name="objectTitle"
          className={
            isTitleEmpty
              ? `${styles.objectTitleInput} ${styles.errorTitleInput}`
              : styles.objectTitleInput
          }
          value={editedTitle}
          placeholder="객체 이름 (필수)"
          onChange={handleTitleOnChange}
          onBlur={handleFocusOutTitle}
        />
      </div>
      <div className={styles.inputTitleContainer}>
        <span className={publicStyles.boxTitle}>상세 주소</span>
        <textarea
          name="objecyDetailAddress"
          className={styles.objectDetailAddressInput}
          value={editedDetailAddress}
          placeholder="객체 상세 주소 (선택)"
          onChange={handleDetailAddressOnChange}
          onBlur={handleFocusOutDetailAddress}
        />
      </div>
    </section>
  );
};

export default EditorObjectInfoInputContainer;
