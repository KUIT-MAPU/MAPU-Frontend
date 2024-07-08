import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import SideBar from '../components/userProfile/GlobalNavigationBar';
import styles from '../components/userProfile/GlobalNavigationBar.module.scss';

const UserProfile = () => {
  const { userId } = useParams();

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `@@@님의 페이지 | MAPU`; //api 호출 -> 사용자 타이틀에 추가
  }, []);

  return (
    <div className={styles.container}>
      <SideBar>UserProfile</SideBar>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default UserProfile;
