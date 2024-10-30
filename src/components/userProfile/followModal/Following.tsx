import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Following.module.scss';
import { ReactComponent as IcoFollowing } from '../../../assets/ico_user_following.svg';
import { ReactComponent as ModalClose } from '../../../assets/btn_followmodal_close.svg';
import { ReactComponent as Search } from '../../../assets/ico_search.svg';
import { ReactComponent as User } from '../../../assets/user.svg';

import instance from '../../../apis/instance';
import axios from 'axios';


const Following = ({ onClose }: { onClose: () => void }) => {
  const [followingUsers,setFollowingUsers] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredUsers = followingUsers.filter((user:any) =>
    user.nickName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const unFollowing = async (followingId : number) => { 
    try{
      const response = await instance.delete(`/unfollow?followingId=${followingId}`);
      console.error("삭제성공", response.data);

      setFollowingUsers((currentUsers) =>
        currentUsers.filter((user) => user.userId !== followingId)
      );
    } catch(error){
      console.error("삭제실패",error);
    }
  }
  
  console.log(followingUsers);
  // console.log(filteredUsers);

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
              <Link to={`/user/${user.userId}`} className={styles.userInfo}>
              <img
                        src={user.imgUrl}
                        alt="profileImage"
                        className={styles.userProfilePic}
                      />
                <div className={styles.userName}>{user.nickName}</div>
              </Link>
              <button className={styles.isFollow} onClick={() => {unFollowing(user.userId)}}>
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
