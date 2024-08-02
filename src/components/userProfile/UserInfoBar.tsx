import React, { useState, useEffect } from 'react';
import styles from './UserInfoBar.module.scss';
import { ReactComponent as ProfilePerson } from '../../assets/img_user_default_profile.svg';
import Following from './followModal/Following'

const UserInfoBar = (props: { children?: React.ReactNode }) => {
  const [isFollowingOpen, setIsFollowingOpen] = useState(false);

  const openFollowing = () =>{
    setIsFollowingOpen(true);
  }

  const closeFollowing = () =>{
    setIsFollowingOpen(false);
  }
  
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
          <span>0</span>
        </div>
        <div className={styles.UserProfileBox}>
          <div>팔로워</div>
          <span>0</span>
        </div>
        <div className={styles.UserProfileBox} onClick={openFollowing}>
          <div>팔로잉</div>
          <span>0</span>
        </div>
      </div>
      <div className={styles.ProfileBottom}>로그인하기</div>

      {isFollowingOpen && <Following onClose={closeFollowing} />}
    </div>
  );
};

export default UserInfoBar;
