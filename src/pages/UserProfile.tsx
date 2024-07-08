import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/userProfile/GlobalNavigationBar';
import styles from '../components/userProfile/GlobalNavigationBar.module.scss';

const UserProfile = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `@@@님의 페이지 | MAPU`; //props로 받아와 넣는 것으로 수정
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
