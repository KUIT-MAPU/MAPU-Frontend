import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import styles from './GlobalNavigationBar.module.scss';
import {ReactComponent as MapuLogo} from '../../assets/MapuLogo.svg';
import {ReactComponent as Home} from '../../assets/Home.svg';
import {ReactComponent as Explore} from '../../assets/Explore.svg';
import {ReactComponent as User} from '../../assets/User.svg';
import {ReactComponent as Logout } from '../../assets/Logout.svg';
import {ReactComponent as Login } from '../../assets/Login.svg';

const SideBar = (props: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.LeftSideBar}>
                <div className={styles.logoIconContainer}>
                    <MapuLogo className={styles.icon} />
                </div>
                <Link to="/" className={styles.link}>
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
                    <div className={`${styles.iconContainer} ${styles.userIconContainer}`}>
                        <User className={styles.icon} />
                    </div>
                </Link>
                <div className={`${styles.iconContainer} ${styles.bottomIconContainer}`}>
                    <Logout className={styles.icon} />
                </div>
            </div>
            <main className={styles.main}>
                {props.children}
            </main>
        </div>
    );
};

export default SideBar;