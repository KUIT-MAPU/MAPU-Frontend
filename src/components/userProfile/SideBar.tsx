import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SideBar.module.scss';
import {ReactComponent as Logo} from '../../assets/MapuLogo.svg';

const SideBar = (props: { children: React.ReactNode }) => {
    return (
        <div className={styles.container}>
            <div className={styles.LeftSideBar}>
                <Link to="/" className={styles.link}>
                    <div className={`${styles.iconContainer} ${styles.logoIconContainer}`}>
                        <Logo className={styles.icon} />
                    </div>
                </Link>
                <Link to="/" className={styles.link}>
                    <div className={styles.iconContainer}>
                        <i className={`fas fa-home ${styles.icon}`}></i>
                    </div>
                </Link>
                <Link to="/explore" className={styles.link}>
                    <div className={styles.iconContainer}>
                        <i className={`fas fa-explore ${styles.icon}`}></i>
                    </div>
                </Link>
                <Link to="/user" className={styles.link}>
                    <div className={styles.iconContainer}>
                        <i className={`fas fa-user ${styles.icon}`}></i>
                    </div>
                </Link>
            </div>
            <main className={styles.main}>
                {props.children}
            </main>
        </div>
    );
};

export default SideBar;
