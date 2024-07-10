import { useLocation, useNavigate } from 'react-router-dom';
import styles from './LoginModal.module.scss';

import KakaoLogo from '../../assets/login/kakao.svg';
import GoogleLogo from '../../assets/login/google.svg';

interface Props {
  setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal: React.FC<Props> = ({ setIsRegistering }) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const isWelcome = `${pathname}` === '/';

  const handleSignUp = () => {
    setIsRegistering(true); //전역 상태 관리 개발 후 수정 필요
    navigate(`${pathname}#signup`); //api 호출 후 회원가입 필요하면 해야 하는 애
  };

  const handleBackEvent = () => {
    navigate(pathname);
    setIsRegistering(false);
  };
  window.addEventListener('popstate', handleBackEvent);

  return (
    <div
      className={
        isWelcome
          ? `${styles.loginModalContainer} ${styles.welcomeLoginModalContainer}`
          : `${styles.loginModalContainer}`
      }
    >
      {!isWelcome && (
        <div className={styles.textContainer}>
          <h5>로그인</h5>
          <span>
            SNS로 간편하게 로그인하고
            <br />
            마푸를 즐겨보세요!
          </span>
        </div>
      )}
      <div className={styles.btnContainer}>
        <button
          type="button"
          className={`${styles.loginBtn} ${styles.kakaoBtn}`}
          onClick={handleSignUp}
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
          onClick={handleSignUp}
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
