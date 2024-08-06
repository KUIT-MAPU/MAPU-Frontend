import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './GlobalNavigationBar.module.scss';
import { ReactComponent as MapuLogo } from '../../assets/mapu-logo.svg';
import { ReactComponent as Home } from '../../assets/home.svg';
import { ReactComponent as Explore } from '../../assets/explore.svg';
import { ReactComponent as User } from '../../assets/user.svg';
import { ReactComponent as Login } from '../../assets/login.svg';

const GlobalNavigationBar = (props: { children?: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.LeftSideBar}>
        <div className={styles.logoIconContainer}>
          <MapuLogo className={styles.icon} />
        </div>
        <Link to="/timeline" className={styles.link}>
          <div className={styles.iconContainer}>
            <Home className={styles.icon} />
          </div>
        </Link>
        <Link to="/explore" className={styles.link}>
          <div className={styles.iconContainer}>
            <Explore className={styles.icon} />
          </div>
        </Link>
        <Link to="/user" className={styles.link}>
          <div
            className={`${styles.iconContainer} ${styles.userIconContainer}`}
          >
            <User className={styles.icon} />
          </div>
        </Link>
        <div
          className={`${styles.iconContainer} ${styles.bottomIconContainer}`}
        >
          <Login className={styles.icon} />
        </div>
      </div>
      <main className={styles.main}>{props.children}</main>
    </div>
  );
};

export default GlobalNavigationBar;
