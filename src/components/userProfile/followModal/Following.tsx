import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Following.module.scss';
import { ReactComponent as IcoFollowing } from '../../../assets/ico_user_following.svg';
import { ReactComponent as ModalClose } from '../../../assets/btn_followmodal_close.svg';
import { ReactComponent as Search } from '../../../assets/ico_search.svg';
import { ReactComponent as User } from '../../../assets/user.svg';


interface User {
  id: number;
  name: string;
  profilePic: string;
}

const Following = ({ onClose }: { onClose: () => void }) => {
  const [followingUsers,setIsFollowingUsers] = useState<User[]>([
    { id: 1, name: 'User 1', profilePic: '/path/to/profile1.jpg' },
    { id: 2, name: 'User 2', profilePic: '/path/to/profile2.jpg' },
    { id: 3, name: 'User 3', profilePic: '/path/to/profile3.jpg' },
    { id: 4, name: 'User 3', profilePic: '/path/to/profile3.jpg' },
    { id: 5, name: 'User 3', profilePic: '/path/to/profile3.jpg' },
    { id: 6, name: 'User 3', profilePic: '/path/to/profile3.jpg' },
    { id: 7, name: 'User 3', profilePic: '/path/to/profile3.jpg' },
  ])
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
          {followingUsers.map((user) => (
            <div key={user.id} className={styles.userItem}>
              <div className={styles.userInfo}>
                <User/>
                <div className={styles.userName}>{user.name}</div>
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
