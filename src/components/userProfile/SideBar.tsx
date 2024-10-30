import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SideBar.module.scss';

const SideBar = (props: { children: React.ReactNode }) => {
    return (
        <div className={styles.container}>
            <div className={styles.LeftSideBar}>
                <Link to="/" className={styles.link}>
                    <div className={styles.iconContainer}>
                        <i className={`fas fa-home ${styles.icon}`}></i>
                    </div>
                </Link>
                <Link to="/timeline" className={styles.link}>
                    <div className={styles.iconContainer}>
                        <i className={`fas fa-info-circle ${styles.icon}`}></i>
                    </div>
                </Link>
                <Link to="/explore" className={styles.link}>
                    <div className={styles.iconContainer}>
                        <i className={`fas fa-cog ${styles.icon}`}></i>
                    </div>
                </Link>
                <Link to="/user" className={styles.link}>
                    <div className={styles.iconContainer}>
                        <i className={`fas fa-envelope ${styles.icon}`}></i>
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
