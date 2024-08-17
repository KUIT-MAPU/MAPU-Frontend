import React, { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import GlobalNavigationBar from '../../components/global/GlobalNavigationBar';
import styles1 from '../../components/global/GlobalNavigationBar.module.scss';
import styles2 from '../components/userProfile/GetUserInfoBar.module.scss';
import GetUser from '../../components/userProfile/GetUser';
import EmptyUser from '../../components/userProfile/EmptyUser';
import EmtpyUserInfobar from '../../components/userProfile/userInfoBarCard/EmptyUserInfoBar';
import GetUserInfobar from '../../components/userProfile/userInfoBarCard/GetUserInfoBar';


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

  console.log(RegisterStatus.LOG_IN);
  return (
    <div className={styles1.container}>
      <GlobalNavigationBar />
      {RegisterStatus.LOG_IN ? <GetUserInfobar /> : <EmtpyUserInfobar />}
      {RegisterStatus.LOG_IN ? <GetUser /> : <EmptyUser />}
      <main className={styles1.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default UserProfile;
