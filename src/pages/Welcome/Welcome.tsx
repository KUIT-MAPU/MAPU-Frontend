import styles from './Welcome.module.scss';

import WelcomeBanner from '../../assets/welcome-banner.webp';
import LoginModal from '../../components/login/LoginModal';

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
        <LoginModal />
      </div>
    </div>
  );
};

export default Welcome;
