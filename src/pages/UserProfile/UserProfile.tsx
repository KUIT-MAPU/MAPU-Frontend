import React, { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import GlobalNavigationBar from '../../components/global/GlobalNavigationBar';
import styles1 from '../../components/global/GlobalNavigationBar.module.scss';
import UserInfoBar from '../../components/userProfile/userInfoBarCard/GetUserInfoBar';
import styles2 from '../components/userProfile/GetUserInfoBar.module.scss';
import GetUser from '../../components/userProfile/GetUser';
import EmptyUser from '../../components/userProfile/EmptyUser';

import useRegisterStore from '../../stores/registerStore';
import { RegisterStatus } from '../../types/enum/RegisterStatus';

const UserProfile = () => {
  const { profileId } = useParams();
  const [isLog, setIsLog] = useState<boolean>(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);

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
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `@@@님의 페이지 | MAPU`; //api 호출 -> 사용자 타이틀에 추가
  }, []);

  return (
    <div className={styles1.container}>
      <GlobalNavigationBar />
      <UserInfoBar />
      {/*{RegisterStatus.LOG_IN ? <EmptyUser /> : <GetUser />}   로그인구현 정상 되면 주석 제거*/}
      <GetUser /> 
      <main className={styles1.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default UserProfile;
