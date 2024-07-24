import { useLocation, useNavigate } from 'react-router-dom';
import styles from './LoginModal.module.scss';
import useRegisterStore from '../../stores/registerStore';
import KakaoLogo from '../../assets/login/ico_kakao.svg';
import GoogleLogo from '../../assets/login/ico_google.svg';

const LoginModal = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const { setLoginNeeded } = useRegisterStore();

  //oauth 요청 URL
  const ENCODED_PRESENT_URI = encodeURIComponent(pathname);
  const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URL}&response_type=code&state=${ENCODED_PRESENT_URI}`;
  const GOOGLE_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_API_KEY}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URL}&response_type=code&scope=email profile&state=${ENCODED_PRESENT_URI}`;

  const isWelcome = `${pathname}` === '/';

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_URL;
  };

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_URL;
  };

  const handleLater = () => {
    setLoginNeeded(false);
    if (pathname === '/') {
      navigate('/timeline');
    } else {
      const prevUrl = pathname.split('?')[0];
      navigate(prevUrl);
    }
  };

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
          onClick={handleKakaoLogin}
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
          onClick={handleGoogleLogin}
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
          onClick={handleLater}
        >
          <span>나중에 하기</span>
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
