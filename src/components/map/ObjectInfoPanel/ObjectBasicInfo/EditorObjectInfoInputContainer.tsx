import { useEffect, useState } from 'react';
import styles from './EditorObjectInfoInputContainer.module.scss';
import publicStyles from '../ObjectContainerPublicStyle.module.scss';

interface Props {
  name: string;
  detailAddress: string;
}

const EditorObjectInfoInputContainer: React.FC<Props> = ({
  name,
  detailAddress,
}) => {
  const [editedName, setEditedName] = useState<string>();
  const [isNameEmpty, setIsNameEmpty] = useState<boolean>(false);
  const [editedDetailAddress, setEditedDetailAddress] = useState<string>();

  useEffect(() => {
    setEditedName(name);
    setEditedDetailAddress(detailAddress);
  }, []);

  const handleNameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.currentTarget.value);
  };

  const handleDetailAddressOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setEditedDetailAddress(e.currentTarget.value);
  };

  const handleFocusOutName = () => {
    if (editedName === '' || editedName === null) {
      setIsNameEmpty(true);
    } else {
      //TODO: 객체 이름 저장 api 호출
      setIsNameEmpty(false);
    }
  };

  const handleFocusOutDetailAddress = () => {
    //TODO: 객체 상세 주소 저장 api 호출
  };

  return (
    <section className={styles.editorObjectInfoInputContainer}>
      <div className={styles.inputContainer}>
        <span className={publicStyles.boxTitle}>이름</span>
        <input
          type="text"
          name="objectTitle"
          className={
            isNameEmpty
              ? `${styles.objectNameInput} ${styles.errorNameInput}`
              : styles.objectNameInput
          }
          value={editedName}
          placeholder="객체 이름 (필수)"
          onChange={handleNameOnChange}
          onBlur={handleFocusOutName}
        />
      </div>
      <div className={styles.inputContainer}>
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
