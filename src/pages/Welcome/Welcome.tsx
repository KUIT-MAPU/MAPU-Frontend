import { useState } from 'react';
import styles from './Welcome.module.scss';

import WelcomeBanner from '../../assets/welcome-banner.webp';
import GreenTransparentLogo from '../../assets/mapu-logo/green-transparent.svg';
import LoginModal from '../../components/login/LoginModal';
import SignUpModal from '../../components/login/SignUpModal';

const Welcome = () => {
  const [isRegistering, setIsRegistering] = useState(false);

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
            {isRegistering ? <h3>프로필 만들기</h3> : <h3>환영합니다!</h3>}
            {isRegistering ? (
              <h4>나만의 닉네임과 아이디를 만들어보세요</h4>
            ) : (
              <h4>SNS 로그인을 하고 나만의 지도를 만들어보세요</h4>
            )}
          </div>
        </div>

        {isRegistering ? (
          <SignUpModal />
        ) : (
          <LoginModal setIsRegistering={setIsRegistering} /> //전역 상태로 로그인 관리하면 props 삭제될 것 같음
        )}
      </div>
    </div>
  );
};

export default Welcome;
