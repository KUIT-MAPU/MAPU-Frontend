import React, { useState, useEffect } from 'react';
import styles from './UserInfoBar.module.scss';


const UserInfoBar = (props: { children?: React.ReactNode }) => {
    return (
        <div className={styles.UserInfoBar}>
            <div className={styles.UserPhoto} />
            <div className={styles.UserName} />
            <div className={styles.UserProfileNumber} />
            <div className={styles.ProfileBottom}>
                로그인하기
            </div>
        </div>
    );
};


export default UserInfoBar;