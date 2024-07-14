import styles from './UserDataInput.module.scss';

import InfoGrayCircle from '../../assets/info-gray-circle.svg';
import InfoErrorCircle from '../../assets/info-error-cricle.svg';
import { useEffect, useMemo, useState } from 'react';

interface Props {
  type: string;
  setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserDataInput: React.FC<Props> = ({ type, setIsComplete }) => {
  //실시간 유효성 검사
  const [nickname, setNickname] = useState<string>(); //TODO: api 호출에 필요
  const [isNicknameEmpty, setIsNicknameEmpty] = useState<boolean>(false);
  const [isValidNickname, setIsValidNickname] = useState<boolean>(true);

  const [id, setId] = useState<string>();
  const [isIdEmpty, setIsIdEmpty] = useState<boolean>(false);
  const [isValidId, setIsValidId] = useState<boolean>(true);

  //시작/적용하기 눌렀을 때
  const [idDuplicatedError, setIdDuplicatedError] = useState<boolean>(false); //사용 중인 아이디인지
  const [idUnavailableError, setIdUnavailableError] = useState<boolean>(true); //사용 가능한 아이디인지

  useEffect(() => {
    if (id === undefined && nickname === undefined) {
      setIsComplete(false);
      return;
    }
    if (!isNicknameEmpty && !isIdEmpty && isValidNickname && isValidId) {
      console.log('setIsComplete');
      setIsComplete(true);
    } else {
      console.log('setIsComplete false');
      setIsComplete(false);
    }
  }, [isNicknameEmpty, isValidNickname, isIdEmpty, isValidId]);

  const onChangeNicknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nicknameValue = e.target.value;
    setNickname(nicknameValue);
    nicknameCheckHandler(nicknameValue);
  };
  const nicknameCheckHandler = async (nickname: string) => {
    //한글, 영문, 숫자, 마침표, 언더바 5종류 / 3~12자
    const nicknameRegex = /^[ㄱ-ㅎㅏ-ㅣ가-힣A-Za-z\d._]{3,12}$/;
    if (nickname === '' || nickname === null || !nicknameRegex.test(nickname)) {
      setIsValidNickname(false);
      return;
    }
    setIsNicknameEmpty(false);
    setIsValidNickname(true);
  };

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
    const { name, value } = e.target;
    if (value === '' || value === null) {
      if (name === 'nickname') {
        setIsNicknameEmpty(true);
      }
      if (name === 'id') {
        setIsIdEmpty(true);
      }
    }
  };

  //nickname
  if (type === 'nickname') {
    return (
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="닉네임을 입력하세요."
          required
          autoFocus
          onChange={onChangeNicknameHandler}
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
  }

  //id
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

export default UserDataInput;
