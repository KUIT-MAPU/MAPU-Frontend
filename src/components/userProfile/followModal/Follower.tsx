import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Following.module.scss';
import { ReactComponent as IcoFollower } from '../../../assets/ico_user_follower.svg'
import { ReactComponent as ModalClose } from '../../../assets/btn_followmodal_close.svg'
import { ReactComponent as Search } from '../../../assets/ico_search.svg';

const Follower = ({onClose}: {onClose: () => void}) => {
    return(
    <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
            <div className={styles.modalTop}>
                <IcoFollower />
                <button className={styles.closeButton} onClick={onClose}><ModalClose /></button>
            </div>
            <div className={styles.searchBar}>
                <div className={styles.searchBarText}>
                    <Search />
                    <div>텍스트</div>
                </div>
            </div>
        </div>
      </div>
    )
}

export default Follower;