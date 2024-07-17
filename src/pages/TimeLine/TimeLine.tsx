import { useEffect } from 'react';
import HeaderNavigation from '../../components/timeLine/headerNavigation/HeaderNavigation';
import SideBar from '../../components/userProfile/GlobalNavigationBar';
import LeftBar from '../../components/timeLine/leftBar/LeftBar';
import styles from './TimeLine.module.scss';
import useKeywordStore from '../../stores/keywordStore';
import MapList from '../../components/timeLine/mapList/MapList';

const TimeLine = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `홈 | MAPU`;
  }, []);

  const { selectedList } = useKeywordStore();


  return (
    <>
      <SideBar>
        <div className={styles.leftBarWrapper}>
          <LeftBar />
          <HeaderNavigation>
            <MapList />
          </HeaderNavigation>
        </div>
      </SideBar>
    </>
  );
};

export default TimeLine;
