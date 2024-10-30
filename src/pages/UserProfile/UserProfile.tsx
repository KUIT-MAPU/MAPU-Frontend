import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import GlobalNavigationBar from '../../components/global/GlobalNavigationBar';
import styles from './UserProfile.module.scss';
import GetUser from '../../components/userProfile/GetUser';
import EmptyUser from '../../components/userProfile/EmptyUser';
import EmtpyUserInfobar from '../../components/userProfile/userInfoBarCard/EmptyUserInfoBar';
import GetUserInfobar from '../../components/userProfile/userInfoBarCard/GetUserInfoBar';


import useRegisterStore from '../../stores/registerStore';
import { RegisterStatus } from '../../types/enum/RegisterStatus';

import instance from '../../apis/instance';

const UserProfile = () => {
  const navigate=useNavigate();
  const { profileId } = useParams();
  const [isLog, setIsLog] = useState<boolean>(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
  const [userData, setUserData] = useState({
    nickname: '',
    profileId: '',
    imgUrl: '',
    mapCnt: 0,
    followerCnt: 0,
    followingCnt: 0,
  });


  const { loginNeeded, registerStatus } = useRegisterStore();

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

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `${userData.nickname}님의 페이지 | MAPU`; //api 호출 -> 사용자 타이틀에 추가
  }, [userData.nickname]);


  console.log(registerStatus);
  return (
    <div className={styles.container}>
      <GlobalNavigationBar />
      {registerStatus === RegisterStatus.LOG_IN ? <GetUserInfobar /> : <EmtpyUserInfobar />}
      {registerStatus === RegisterStatus.LOG_IN ? <GetUser /> : <EmptyUser />}
    </div>
  );
};

export default UserProfile;
