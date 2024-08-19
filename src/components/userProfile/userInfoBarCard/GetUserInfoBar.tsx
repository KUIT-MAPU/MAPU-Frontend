import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContainer from '../../login/AuthContainer';
import useRegisterStore from '../../../stores/registerStore';
import { RegisterStatus } from '../../../types/enum/RegisterStatus';

import styles from './GetUserInfoBar.module.scss';
import { ReactComponent as ProfilePerson } from '../../../assets/img_user_default_profile.svg';
import Following from '../followModal/Following';
import Follower from '../followModal/Follower';

import instance from '../../../apis/instance';
import ProfileEdit from '../getProfileEdit/ProfileEdit';
import ProfileSettingModal from '../../profile_setting/LoginProfileSetting';


const UserInfoBar = (props: { children?: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isFollowingOpen, setIsFollowingOpen] = useState(false);
  const [isFollowerOpen, setIsFollowerOpen] = useState(false);
  const [isLog, setIsLog] = useState<boolean>(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState({
    nickname: '',
    profileId: '',
    imgUrl: '',
    mapCnt: 0,
    followerCnt: 0,
    followingCnt: 0,
  });

  // const {setAccessToken, clearAccessToken} = useRegisterStore();
  // useEffect(() => {
  //   const reIssueToken = async () => {
  //     try {
  //       const response = await instance.get('/jwt/reissue');
  //       const data = response.data;

  //       if (data && data.accessToken) {
  //         setAccessToken(data.accessToken);
  //         instance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
  //       }
  //     } catch (error) {
  //       console.error('Failed to reissue token', error);
  //       clearAccessToken(); // 실패 시 토큰 초기화 (로그아웃 처리)
  //     }
  //   };

  //   const responseInterceptor = instance.interceptors.response.use(
  //     (response) => response, // 성공적인 응답 그대로 전달
  //     async (error) => {
  //       const originalRequest = error.config;

  //       if (!originalRequest._retry) {
  //         originalRequest._retry = true; // 무한 루프 방지
  //         await reIssueToken(); // 토큰 재발급 시도
  //         return instance(originalRequest); // 재발급 후 원래 요청 재시도
  //       }

  //       return Promise.reject(error);
  //     }
  //   );

  //   return () => {
  //     // 컴포넌트 언마운트 시 인터셉터 해제
  //     instance.interceptors.response.eject(responseInterceptor);
  //   };
  // }, []);

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

        navigate(`/user/${data.profileId}`);
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };  //로그인 한 유저 정보 받아오기
    

    fetchUserData();
  }, [navigate]);

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

  const handleProfileEditOpen = () => {
    setIsProfileEditOpen(true);
  };

  const handleProfileEditClose = () => {
    setIsProfileEditOpen(false);
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
        {userData.imgUrl ? (
          <img
            src={userData.imgUrl}
            alt="User Profile"
            className={styles.Profile}
          />
        ) : (
          <ProfilePerson />
        )}
      </div>
      <div className={styles.UserName}>
        <h1>{userData.nickname}</h1>
        <span>{`@${userData.profileId}`}</span>
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
      <div className={styles.ProfileBottom} onClick={handleProfileEditOpen}>
        프로필 편집
      </div>

      {isFollowingOpen && <Following onClose={closeFollowing} />}
      {isFollowerOpen && <Follower onClose={closeFollower} />}
      {isProfileEditOpen && (
        <div onClick={handleProfileEditClose} className={styles.modalOverlay}>
          <div className={styles.modalContent}
          onClick={(e) => e.stopPropagation}>
            <ProfileSettingModal onClose={handleProfileEditClose} />
            </div>
        </div>
      )}
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
