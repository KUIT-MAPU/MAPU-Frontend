import styles from './Welcome.module.scss';

import WelcomeBanner from '../../assets/welcome-banner.webp';
import GreenTransparentLogo from '../../assets/logo/green-transparent.svg';
import LoginModal from '../../components/login/LoginModal';
import SignUpModal from '../../components/login/SignUpModal';

const Welcome = () => {
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
            <h3>프로필 만들기</h3>
            <h4>나만의 닉네임과 아이디를 만들어보세요</h4>
          </div>
        </div>

        <LoginModal />
        {/* <SignUpModal /> */}
      </div>
    </div>
  );
};

export default Welcome;
