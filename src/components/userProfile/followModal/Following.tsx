import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Following.module.scss';
import { ReactComponent as IcoFollowing } from '../../../assets/ico_user_following.svg';
import { ReactComponent as ModalClose } from '../../../assets/btn_followmodal_close.svg';
import { ReactComponent as Search } from '../../../assets/ico_search.svg';
import { ReactComponent as User } from '../../../assets/user.svg';

import instance from '../../../apis/instance';


const Following = ({ onClose }: { onClose: () => void }) => {
  const [followingUsers,setFollowingUsers] = useState([]);

  useEffect(() => {
    const fetchUserFollowingData = async () => {
      try {
        const response = await instance.get('/following');
        const data = response.data.result.users;

        setFollowingUsers(data);

      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
   };  
   fetchUserFollowingData();
  }, []);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalTop}>
          <IcoFollowing />
          <button className={styles.closeButton} onClick={onClose}>
            <ModalClose />
          </button>
        </div>
        <div className={styles.searchBar}>
          <div className={styles.searchBarText}>
            <Search />
            <div>검색</div>
          </div>
        </div>
        <div className={styles.userList}>
          {followingUsers.map((user: any) => (
            <div key={user.userId} className={styles.userItem}>
              <div className={styles.userInfo}>
              <img
                        src={user.profileImageUrl}
                        alt="mapImage"
                        className={styles.userProfilePic}
                      />
                <div className={styles.userName}>{user.nickname}</div>
              </div>
              <button className={styles.isFollow}>
                팔로잉
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Following;
