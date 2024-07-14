import styles from './UserDataInput.module.scss';

import InfoGrayCircle from '../../assets/info-gray-circle.svg';
import InfoErrorCircle from '../../assets/info-error-cricle.svg';

interface Props {
  isIdEmpty: boolean;
  isValidId: boolean;
  setId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsValidId: React.Dispatch<React.SetStateAction<boolean>>;
  setIsIdEmpty: React.Dispatch<React.SetStateAction<boolean>>;
}

const IdInput: React.FC<Props> = ({
  isIdEmpty,
  isValidId,
  setId,
  setIsValidId,
  setIsIdEmpty,
}) => {
  const onChangeIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idValue = e.target.value;
    setId(idValue);
    idCheckHandler(idValue);
  };
  const idCheckHandler = async (id: string) => {
    //영문 소문자, 숫자, 마침표, 언더바 4종류 / 3~20자
    const idRegex = /^[a-z\d._]{3,20}$/;
    if (id === '' || id === null || !idRegex.test(id)) {
      setIsValidId(false);
      return;
    }
    setIsIdEmpty(false);
    setIsValidId(true);
  };

  const handleFocusOut = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || value === null) {
      setIsIdEmpty(true);
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        placeholder="아이디를 입력하세요."
        required
        onChange={onChangeIdHandler}
        name="id"
        onBlur={handleFocusOut}
        className={
          isIdEmpty || !isValidId
            ? `${styles.inputBox} ${styles.errorInputBox}`
            : styles.inputBox
        }
      />
      {isIdEmpty ? (
        <div className={styles.valueInfoContainer}>
          <div className={`${styles.valueInfo} ${styles.errorValueInfo}`}>
            <img src={InfoErrorCircle} alt="오류 안내 아이콘" />
            <span>필수 입력 항목</span>
          </div>
        </div>
      ) : isValidId ? (
        <div className={styles.valueInfoContainer}>
          <div className={styles.valueInfo}>
            <img src={InfoGrayCircle} alt="안내 아이콘" />
            <span>3~20글자 이내</span>
          </div>
          <div className={styles.valueInfo}>
            <img src={InfoGrayCircle} alt="안내 아이콘" />
            <span>영문 소문자, 숫자, 특수문자(._) 사용</span>
          </div>
        </div>
      ) : (
        <div className={styles.valueInfoContainer}>
          <div className={`${styles.valueInfo} ${styles.errorValueInfo}`}>
            <img src={InfoErrorCircle} alt="오류 안내 아이콘" />
            <span>3~20글자 이내</span>
          </div>
          <div className={`${styles.valueInfo} ${styles.errorValueInfo}`}>
            <img src={InfoErrorCircle} alt="오류 안내 아이콘" />
            <span>영문 소문자, 숫자, 특수문자(._) 사용</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdInput;
