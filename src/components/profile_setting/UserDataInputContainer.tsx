import { useEffect, useState } from 'react';
import styles from './UserDataInputContainer.module.scss';
import IdInput from './input/IdInput';
import NicknameInput from './input/NicknameInput';

interface Props {
  setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
}
const UserDataInputContainer: React.FC<Props> = ({ setIsComplete }) => {
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
    if (id === undefined || nickname === undefined) {
      setIsComplete(false);
      return;
    }

    if (!isNicknameEmpty && !isIdEmpty && isValidNickname && isValidId)
      setIsComplete(true);
    else setIsComplete(false);
  }, [isNicknameEmpty, isValidNickname, isIdEmpty, isValidId]);

  return (
    <div className={styles.inputContainer}>
      <NicknameInput
        isNicknameEmpty={isNicknameEmpty}
        isValidNickname={isValidNickname}
        setIsNicknameEmpty={setIsNicknameEmpty}
        setIsValidNickname={setIsValidNickname}
        setNickname={setNickname}
      />
      <IdInput
        isIdEmpty={isIdEmpty}
        isValidId={isValidId}
        setIsIdEmpty={setIsIdEmpty}
        setIsValidId={setIsValidId}
        setId={setId}
      />
    </div>
  );
};

export default UserDataInputContainer;
