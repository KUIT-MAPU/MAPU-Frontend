import { useEffect, useMemo, useState } from 'react';
import HeaderNavigation from '../../components/timeLine/headerNavigation/HeaderNavigation';
import SideBar from '../../components/global/GlobalNavigationBar';
import LeftBar from '../../components/timeLine/leftBar/LeftBar';
import styles from './TimeLine.module.scss';
import useKeywordStore from '../../stores/keywordStore';
import MapList from '../../components/timeLine/mapList/MapList';
import useRegisterStore from '../../stores/registerStore';
import { RegisterStatus } from '../../types/enum/RegisterStatus';
import dimmedStyles from '../../components/timeLine/Dimmed.module.scss';
import AuthContainer from '../../components/login/AuthContainer';
import { useLocation, useNavigate } from 'react-router-dom';

const TimeLine = () => {
  const { selectedList } = useKeywordStore();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const { loginNeeded, registerStatus, setLoginNeeded } = useRegisterStore();
  const [dimmed, setDimmed] = useState<boolean>(false);

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `홈 | MAPU`;
  }, []);

  useEffect(() => {
    if (registerStatus !== RegisterStatus.LOG_IN && loginNeeded) {
      setDimmed(true);
      console.log('setDimmed(true)');
    } else {
      setDimmed(false);
    }
  }, [loginNeeded, registerStatus]);

  const handleClose = () => {
    setLoginNeeded(false);
    const prevUrl = pathname.split('?')[0];
    navigate(prevUrl);
  };

  return (
    <div className={styles.timeLineContainer}>
      {dimmed && (
        <div className={dimmedStyles.background} onClick={handleClose} />
      )}
      {dimmed && <AuthContainer className={styles.authContainer} />}
      <SideBar>
        <div className={styles.leftBarWrapper}>
          <LeftBar />
          <HeaderNavigation>
            <MapList />
          </HeaderNavigation>
        </div>
      </SideBar>
    </div>
  );
};

export default TimeLine;
