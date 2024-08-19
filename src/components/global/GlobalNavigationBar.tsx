import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import AuthContainer from '../login/AuthContainer';
import useRegisterStore from '../../stores/registerStore';
import { RegisterStatus } from '../../types/enum/RegisterStatus';

import styles from './GlobalNavigationBar.module.scss';
import { ReactComponent as MapuLogo } from '../../assets/mapu-logo.svg';
import { ReactComponent as Home_off } from '../../assets/btn_home_off.svg';
import { ReactComponent as Home_on } from '../../assets/btn_home_on.svg';
import { ReactComponent as Explore_off } from '../../assets/btn_explore_off.svg';
import { ReactComponent as Explore_on } from '../../assets/btn_explore_on.svg';
import { ReactComponent as User } from '../../assets/user.svg';
import { ReactComponent as Login } from '../../assets/btn_login.svg';
import { ReactComponent as Logout } from '../../assets/btn_logout.svg';
import useLogOutMutation from '../../apis/auth/useLogOutMutation';

import instance from '../../apis/instance';

const GlobalNavigationBar = (props: { children?: React.ReactNode }) => {
  const prevUrl = useLocation().pathname.split('?')[0];
  const navigate = useNavigate();
  const [isLog, setIsLog] = useState<boolean>(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
  const location = useLocation();
  const { loginNeeded, registerStatus, setLoginNeededStatus } =
    useRegisterStore();

  const logOutMutation = useLogOutMutation(prevUrl);
  const [userData, setUserData] = useState({
    nickname: '',
    profileId: '',
    imgUrl: '',
    mapCnt: 0,
    followerCnt: 0,
    followingCnt: 0,
  });

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
    setLoginNeededStatus(false);
    setIsOverlayVisible(false);
  };

  const handleLoginClick = () => {
    setLoginNeededStatus(true);
    setIsOverlayVisible(true);
  };

  const handleLogoutClick = async () => {
    await logOutMutation.mutate();
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await instance.get('/user');
        const data = response.data.result;

        setUserData({
          nickname: data.nickname,
          profileId: data.profileId,
          imgUrl: data.imgUrl,
          mapCnt: data.mapCnt,
          followerCnt: data.followerCnt,
          followingCnt: data.followingCnt,
        });
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };

    fetchUserData();
  }, []);

  const isHomeActive = location.pathname === '/timeline';
  const isExploreActive = location.pathname === '/explore';
  const isUserpageActive = location.pathname === `/user/${userData.profileId}`;

  return (
    <div className={styles.container}>
      <div className={styles.LeftSideBar}>
        <div className={styles.logoIconContainer}>
          <MapuLogo className={styles.icon} />
        </div>
        <Link to="/timeline" className={styles.link}>
          <div
            className={`${styles.iconContainer} ${isHomeActive ? styles.iconContainer_on : styles.iconContainer_off}`}
          >
            {isHomeActive ? (
              <Home_on className={styles.icon} />
            ) : (
              <Home_off className={styles.icon} />
            )}
          </div>
        </Link>
        <Link to="/explore" className={styles.link}>
          <div
            className={`${styles.iconContainer} ${isExploreActive ? styles.iconContainer_on : styles.iconContainer_off}`}
          >
            {isExploreActive ? (
              <Explore_on className={styles.icon} />
            ) : (
              <Explore_off className={styles.icon} />
            )}
          </div>
        </Link>
        <Link to='/user/:userId' className={styles.link}>
          <div
            className={`${styles.iconContainer} ${isUserpageActive ? styles.iconContainer_on : styles.iconContainer_off}`}
          >
            {userData.imgUrl ? (
              <img
                src={userData.imgUrl}
                alt="User Profile"
                className={styles.iconContainer}
              />
            ) : (
              <User />
            )}
          </div>
        </Link>
        <div
          className={`${styles.iconContainer} ${styles.bottomIconContainer}`}
        >
          {registerStatus === RegisterStatus.LOG_IN ? (
            <Logout className={styles.icon} onClick={handleLogoutClick} />
          ) : (
            <Login className={styles.icon} onClick={handleLoginClick} />
          )}
        </div>
      </div>
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
