import styles from './UserDataInput.module.scss';
import InfoGrayCircle from '../../../assets/ico_info_gray.svg';
import InfoErrorCircle from '../../../assets/ico_info_error_red.svg';

interface Props {
  isIdEmpty: boolean;
  isValidId: boolean;
  setId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsIdEmpty: React.Dispatch<React.SetStateAction<boolean>>;
  setIsValidId: React.Dispatch<React.SetStateAction<boolean>>;
}

const IdInput: React.FC<Props> = ({
  isIdEmpty,
  isValidId,
  setId,
  setIsIdEmpty,
  setIsValidId,
}) => {
  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idValue = e.target.value;
    setId(idValue);
    checkId(idValue);
  };

  const checkId = async (id: string) => {
    //영문 소문자, 숫자, 마침표, 언더바 4종류 / 3~20자
    const idRegex = /^[a-z\d._]{3,20}$/;
    if (id !== '' && id !== null) setIsIdEmpty(false);
    if (!idRegex.test(id)) setIsValidId(false);
    else {
      setIsIdEmpty(false);
      setIsValidId(true);
    }
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
        onChange={onChangeId}
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
