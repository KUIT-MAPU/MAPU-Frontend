import { useEffect } from 'react';
import SideBar from '../../components/global/GlobalNavigationBar';
import HeaderNavigation from '../../components/timeLine/headerNavigation/HeaderNavigation';
import LeftBar from '../../components/timeLine/leftBar/LeftBar';
import styles from './Explore.module.scss';
import useKeywordStore from '../../stores/keywordStore';

const Explore = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `탐색 | MAPU`;
  }, []);

  const { selectedList } = useKeywordStore();

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
