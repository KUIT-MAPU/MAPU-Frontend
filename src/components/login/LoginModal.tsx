import { useLocation, useNavigate } from 'react-router-dom';
import styles from './LoginModal.module.scss';

import GreenTransparentLogo from '../../assets/mapu-logo/green-transparent.svg';
import KakaoLogo from '../../assets/login/kakao.svg';
import GoogleLogo from '../../assets/login/google.svg';

interface Props {
  isRegistering: boolean;
  setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal: React.FC<Props> = ({ isRegistering, setIsRegistering }) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  return (
    <div>
      {`${pathname}` !== '/' && <div>hh</div>}
      <div className={styles.btnContainer}>
        <button
          type="button"
          className={`${styles.loginBtn} ${styles.kakaoBtn}`}
        >
          <img
            src={KakaoLogo}
            alt="카카오 아이콘"
            className={styles.socialIcon}
          />
          <span>카카오 계정으로 시작하기</span>
        </button>
        <button
          type="button"
          className={`${styles.loginBtn} ${styles.googleBtn}`}
        >
          <img
            src={GoogleLogo}
            alt="구글 아이콘"
            className={styles.socialIcon}
          />
          <span>구글 계정으로 시작하기</span>
        </button>
        <button
          type="button"
          className={`${styles.loginBtn} ${styles.laterBtn}`}
          onClick={() => navigate('/timeline')}
        >
          <span>나중에 하기</span>
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
