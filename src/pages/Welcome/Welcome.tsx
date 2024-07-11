import styles from './Welcome.module.scss';

import WelcomeBanner from '../../assets/welcome-banner.webp';
import GreenTransparentLogo from '../../assets/mapu-logo/green-transparent.svg';
import LoginModal from '../../components/login/LoginModal';
import SignUpModal from '../../components/login/SignUpModal';
import useRegisterStore from '../../stores/registerStore';
import { RegisterStatus } from '../../types/RegisterStatus';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Welcome = () => {
  const navigate = useNavigate();
  const { registerStatus } = useRegisterStore();

  useEffect(() => {
    if (registerStatus === RegisterStatus.LOG_IN) {
      navigate('/timeline');
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <img src={WelcomeBanner} alt="MAPU 배너 이미지" />
        <div className={styles.titleContainer}>
          <h1>MAPU</h1>
          <h2>함께 만들어가는 우리의 지도</h2>
        </div>
      </div>
      <div className={styles.loginPanel}>
        <div className={styles.welcomeContainer}>
          <img
            src={GreenTransparentLogo}
            alt="투명 배경의 초록색 MAPU 로고"
            className={styles.logo}
          />
          <div className={styles.welcome__textContainer}>
            {registerStatus === RegisterStatus.NEED_LOG_IN ? (
              <h3>환영합니다!</h3>
            ) : (
              <h3>프로필 만들기</h3>
            )}
            {registerStatus === RegisterStatus.NEED_LOG_IN ? (
              <h4>SNS 로그인을 하고 나만의 지도를 만들어보세요</h4>
            ) : (
              <h4>나만의 닉네임과 아이디를 만들어보세요</h4>
            )}
          </div>
        </div>

        {registerStatus === RegisterStatus.NEED_LOG_IN ? (
          <LoginModal />
        ) : (
          <SignUpModal />
        )}
      </div>
    </div>
  );
};

export default Welcome;
