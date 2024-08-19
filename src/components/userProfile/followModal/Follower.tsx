import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Follower.module.scss';
import { ReactComponent as IcoFollower } from '../../../assets/ico_user_follower.svg';
import { ReactComponent as ModalClose } from '../../../assets/btn_followmodal_close.svg';
import { ReactComponent as Search } from '../../../assets/ico_search.svg';
import { ReactComponent as User } from '../../../assets/user.svg';

import instance from '../../../apis/instance';

const Follower = ({ onClose }: { onClose: () => void }) => {
  const [followerUsers,setFollowerUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUserFollowerData = async () => {
      try {
        const response = await instance.get('/follower');
        const data = response.data.result.users;

        setFollowerUsers(data);

      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
   };  
   fetchUserFollowerData();
  }, []);

  const filteredUsers = followerUsers.filter((user:any) =>
    user.nickName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalTop}>
          <IcoFollower />
          <button className={styles.closeButton} onClick={onClose}>
            <ModalClose />
          </button>
        </div>
        <div className={styles.searchBar}>
          <div className={styles.searchBarText}>
            <Search />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.userList}>
          {filteredUsers.map((user: any) => (
            <div key={user.userId} className={styles.userItem}>
              <div className={styles.userInfo}>
              <img
                        src={user.imgUrl}
                        alt="propfileImage"
                        className={styles.userProfilePic}
                />
                <div className={styles.userName}>{user.nickName}</div>
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

export default Follower;
