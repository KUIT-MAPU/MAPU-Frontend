import { useEffect } from 'react';
import SideBar from '../../components/userProfile/GlobalNavigationBar';
import HeaderNavigation from '../../components/timeLine/headerNavigation/HeaderNavigation';
import LeftBar from '../../components/timeLine/leftBar/LeftBar';
import styles from './Explore.module.scss';

const Explore = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `탐색 | MAPU`;
  }, []);

  return (
    <>
      <SideBar>
        <div className={styles.leftBarWrapper}>
          <LeftBar />
          <HeaderNavigation>
            <p>Explore</p>
          </HeaderNavigation>
        </div>
      </SideBar>
    </>
  );
};

export default Explore;
