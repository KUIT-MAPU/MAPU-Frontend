import React, { useState, useEffect } from 'react';
import AuthContainer from '../login/AuthContainer';
import useRegisterStore from '../../stores/registerStore';
import { RegisterStatus } from '../../types/enum/RegisterStatus';

import styles from './UserInfoBar.module.scss';
import { ReactComponent as ProfilePerson } from '../../assets/img_user_default_profile.svg';
import Following from './followModal/Following';
import Follower from './followModal/Follower';

import instance from '../../apis/instance';

const UserInfoBar = (props: { children?: React.ReactNode }) => {
  const [isFollowingOpen, setIsFollowingOpen] = useState(false);
  const [isFollowerOpen, setIsFollowerOpen] = useState(false);
  const [isLog, setIsLog] = useState<boolean>(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
  const [userData, setUserData] = useState({
    nickname:'',
    profileId:'',
    imgUrl:'',
    mapCnt:0,
    followerCnt:0,
    followingCnt:0,
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await instance.get('/user');
        const data = response.data;
  
        setUserData({
          nickname: data.nickname,
          profileId: data.profileId,
          imgUrl: data.imgUrl,
          mapCnt:data.mapCnt,
          followerCnt: data.followerCnt,
          followingCnt: data.followingCnt,
        });
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };
  
    fetchUserData();
  }, []);


  const { loginNeeded, registerStatus, setLoginNeededStatus } =
    useRegisterStore();

  const openFollowing = () => {
    setIsFollowingOpen(true);
  };

  const closeFollowing = () => {
    setIsFollowingOpen(false);
  };

  const openFollower = () => {
    setIsFollowerOpen(true);
  };

  const closeFollower = () => {
    setIsFollowerOpen(false);
  };

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

  return (
    <div className={styles.UserInfoBar}>
      <div className={styles.UserPhoto}>
        <ProfilePerson />
      </div>
      <div className={styles.UserName}>
        <h1>환영해요!</h1>
        <span>로그인이 필요해요</span>
      </div>
      <div className={styles.UserProfileNumber}>
        <div className={styles.UserProfileBox}>
          <div>내 지도</div>
          <span>{userData.mapCnt}</span>
        </div>
        <div className={styles.UserProfileBox} onClick={openFollower}>
          <div>팔로워</div>
          <span>{userData.followerCnt}</span>
        </div>
        <div className={styles.UserProfileBox} onClick={openFollowing}>
          <div>팔로잉</div>
          <span>{userData.followingCnt}</span>
        </div>
      </div>
      <div className={styles.ProfileBottom} onClick={handleLoginClick}>
        로그인하기
      </div>

      {isFollowingOpen && <Following onClose={closeFollowing} />}
      {isFollowerOpen && <Follower onClose={closeFollower} />}
      {isOverlayVisible && (
        <>
          <div onClick={handleClose} />
          <AuthContainer className={styles.authContainer} />
        </>
      )}
    </div>
  );
};

export default UserInfoBar;
