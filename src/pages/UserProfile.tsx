import React from 'react'
import { Outlet } from 'react-router-dom';
import SideBar from '../components/userProfile/GlobalNavigationBar'
import styles from '../components/userProfile/GlobalNavigationBar.module.scss';

const UserProfile = () => {
  return (
    <div className={styles.container}>
      <SideBar>
        UserProfile
      </SideBar>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default UserProfile