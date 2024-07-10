import { useEffect } from 'react';
import HeaderNavigation from '../../components/timeLine/headerNavigation/HeaderNavigation';
import SideBar from '../../components/userProfile/GlobalNavigationBar';
import LeftBar from '../../components/timeLine/leftBar/LeftBar';
import styles from './TimeLine.module.scss';

const TimeLine = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `홈 | MAPU`;
  }, []);

  return (
    <>
      <SideBar>
        <div className={styles.leftBarWrapper}>
          <LeftBar />
          <HeaderNavigation>
            <p>TimeLine</p>
          </HeaderNavigation>
        </div>
      </SideBar>
    </>
  );
};

export default TimeLine;
