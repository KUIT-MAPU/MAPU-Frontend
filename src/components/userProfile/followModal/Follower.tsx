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
  const [followingUsers,setFollowingUsers] = useState<any[]>([])
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

  //팔로워중에서 내가 팔로잉한 사람들인지 비교
  //내가 팔로잉 했다면 팔로잉 회색 버튼, 안했다면 팔로잉 초록색 버튼

  const isFollowing = ((userId : string) => {
    return followerUsers.some((followingUsers) => followingUsers.userId === userId)
  })

  const filteredUsers = followerUsers.filter((user:any) =>
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

  const Following = async (followingId : number) => { 
    try{
      const response = await instance.post(`/follow`,{followingId});
      console.error("팔로우성공", response.data);

      setFollowingUsers((currentUsers) =>
        currentUsers.filter((user) => user.userId !== followingId)
      );
    } catch(error){
      console.error("팔로우실패",error);
    }
  }

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
              <Link to={`/user/${user.userId}`} className={styles.userInfo}>
              <img
                        src={user.imgUrl}
                        alt="propfileImage"
                        className={styles.userProfilePic}
                />
                <div className={styles.userName}>{user.nickName}</div>
              </Link>
              <button className={isFollowing(user.userId) ? styles.isFollowing : styles.notFollowing}
              onClick={() => {isFollowing(user.userId) ? unFollowing(user.userId) : Following(user.userId)}}
              >
                {isFollowing(user.userId) ? '팔로잉' : '팔로우'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Follower;
