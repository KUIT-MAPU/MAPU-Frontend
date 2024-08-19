import styles from './UserDataInput.module.scss';
import InfoGrayCircle from '../../../assets/ico_info_gray.svg';
import InfoErrorCircle from '../../../assets/ico_info_error_red.svg';

import { useState } from 'react';
interface Props {
  isNicknameEmpty: boolean;
  isValidNickname: boolean;
  setNickname: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsNicknameEmpty: React.Dispatch<React.SetStateAction<boolean>>;
  setIsValidNickname: React.Dispatch<React.SetStateAction<boolean>>;
}

const NicknameInput: React.FC<Props> = ({
  isValidNickname,
  isNicknameEmpty,
  setNickname,
  setIsNicknameEmpty,
  setIsValidNickname,
}) => {
  const [nicknameValue, setnicknameValue] = useState<string>(''); // 상태 관리

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setnicknameValue(value); // 입력값을 상태에 저장
    setNickname(nicknameValue);
    checkNickname(nicknameValue);
  };

  const checkNickname = async (nickname: string) => {
    //한글, 영문, 숫자, 마침표, 언더바 5종류 / 3~12자
    const nicknameRegex = /^[ㄱ-ㅎㅏ-ㅣ가-힣A-Za-z\d._]{3,12}$/;
    if (nickname !== '' && nickname !== null) setIsNicknameEmpty(false);
    if (!nicknameRegex.test(nickname)) setIsValidNickname(false);
    else {
      setIsNicknameEmpty(false);
      setIsValidNickname(true);
    }
  };

  const handleFocusOut = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || value === null) {
      setIsNicknameEmpty(true);
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        placeholder="닉네임을 입력하세요."
        required
        autoFocus
        value={nicknameValue}
        onChange={onChangeNickname}
        onBlur={handleFocusOut}
        name="nickname"
        className={
          isNicknameEmpty || !isValidNickname
            ? `${styles.inputBox} ${styles.errorInputBox}`
            : styles.inputBox
        }
      />
      {isNicknameEmpty ? (
        <div className={styles.valueInfoContainer}>
          <div className={`${styles.valueInfo} ${styles.errorValueInfo}`}>
            <img src={InfoErrorCircle} alt="오류 안내 아이콘" />
            <span>필수 입력 항목</span>
          </div>
        </div>
      ) : (
        <div className={styles.valueInfoContainer}>
          {isValidNickname ? (
            <div className={styles.valueInfo}>
              <img src={InfoGrayCircle} alt="회색 안내 아이콘" />
              <span>3~12글자 이내</span>
            </div>
          ) : (
            <div className={`${styles.valueInfo} ${styles.errorValueInfo}`}>
              <img src={InfoErrorCircle} alt="오류 안내 아이콘" />
              <span>3~12글자 이내</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NicknameInput;
