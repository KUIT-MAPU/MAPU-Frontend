import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import GlobalNavigationBar from '../../components/global/GlobalNavigationBar';
import styles1 from '../../components/global/GlobalNavigationBar.module.scss';
import UserInfoBar from '../../components/userProfile/UserInfoBar';
import styles2 from '../components/userProfile/UserInfoBar.module.scss';
import GetUser from '../../components/userProfile/GetUser';

const UserProfile = () => {
  const { userId } = useParams();

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `@@@님의 페이지 | MAPU`; //api 호출 -> 사용자 타이틀에 추가
  }, []);

  return (
    <div className={styles1.container}>
      <GlobalNavigationBar />
      <UserInfoBar />
      <GetUser />
      <main className={styles1.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default UserProfile;
