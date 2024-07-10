import React, { useState, useEffect } from 'react';
import styles from './UserInfoBar.module.scss';


const UserInfoBar = (props: { children: React.ReactNode }) => {
    return (
        <div className={styles.UserInfoBar}>
            {props.children}
        </div>
    );
};


export default UserInfoBar;