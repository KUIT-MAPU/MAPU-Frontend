import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AuthContainer from '../login/AuthContainer';
import useRegisterStore from '../../stores/registerStore';
import { RegisterStatus } from '../../types/enum/RegisterStatus';

import styles from './GlobalNavigationBar.module.scss';
import { ReactComponent as MapuLogo } from '../../assets/mapu-logo.svg';
import { ReactComponent as Home } from '../../assets/home.svg';
import { ReactComponent as Explore } from '../../assets/explore.svg';
import { ReactComponent as User } from '../../assets/user.svg';
import { ReactComponent as Login } from '../../assets/login.svg';

const GlobalNavigationBar = (props: { children?: React.ReactNode }) => {
  const [isLog, setIsLog] = useState<boolean>(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);

  const { loginNeeded, registerStatus, setLoginNeeded } = useRegisterStore();

  useEffect(() => {
    if (registerStatus !== RegisterStatus.LOG_IN && loginNeeded) {
      setIsLog(false);
      setIsOverlayVisible(true);
      console.log('setDimmed(true');
    } else {
      setIsLog(true);
      setIsOverlayVisible(false);
      console.log('setDimmed(false)');
    }
  }, [loginNeeded, registerStatus]);

  const handleClose = () => {
    setLoginNeeded(false);
    setIsOverlayVisible(false);
  };

  const handleLoginClick = () => {
    setLoginNeeded(true);
    setIsOverlayVisible(true);
  };
  return (
    <div className={styles.container}>
      <div className={styles.LeftSideBar}>
        <div className={styles.logoIconContainer}>
          <MapuLogo className={styles.icon} />
        </div>
        <Link to="/timeline" className={styles.link}>
          <div className={styles.iconContainer}>
            <Home className={styles.icon} />
          </div>
        </Link>
        <Link to="/explore" className={styles.link}>
          <div className={styles.iconContainer}>
            <Explore className={styles.icon} />
          </div>
        </Link>
        <Link to="/user/:userId" className={styles.link}>
          <div
            className={`${styles.iconContainer} ${styles.userIconContainer}`}
          >
            <User className={styles.icon} />
          </div>
        </Link>
        <div
          className={`${styles.iconContainer} ${styles.bottomIconContainer}`}
        >
          <Login className={styles.icon} onClick={handleLoginClick} />
        </div>
      </div>
      <main className={styles.main}>{props.children}</main>
      {isOverlayVisible && (
        <>
          <div onClick={handleClose} />
          <AuthContainer className={styles.authContainer} />
        </>
      )}
    </div>
  );
};

export default GlobalNavigationBar;
