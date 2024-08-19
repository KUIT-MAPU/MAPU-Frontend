import React, { useState, useEffect } from 'react';

import styles from './ProfileEdit.module.scss'
import { ReactComponent as ModalClose } from '../../../assets/btn_followmodal_close.svg';
import { ReactComponent as NewMapIcon } from '../../../assets/ico_newmap.svg';
import { ReactComponent as ProfileEditIcon } from '../../../assets/ico_profile_edit.svg';
import { ReactComponent as FontAlert } from '../../../assets/ico_font_alert.svg';


import instance from '../../../apis/instance';

const ProfileEdit = ({ onClose }: { onClose: () => void }) => {
    const [imageUrl, setImageUrl] =useState<string>('ddd');
    const [userNickName, setUserNickName] = useState<string>('d');
    const [userId, setUserId] = useState<string>('');
    const [userProfileData,setUserProfileDate] = useState({
      nickname: '',
      profileId: '',
      imgUrl: '',
  });
    
    const isFormValid = userNickName.length >= 3 && userId.length >= 3;

    
    const getButtonStyle = () => {
        return isFormValid
          ? `${styles.onEditCreate}`
          : `${styles.offEditCreate}`;
      };

    const sendDataToBackend = async (data:any) => {
        try {
          const response = await instance.patch('/user', data);
          console.log('Data sent successfully:', response.data);
        } catch (error) {
          console.error('Failed to send data:', error);
        }
      };
      

    const handleSubmit = (event:any) => {
        event.preventDefault();
        
        if(!userNickName || !userId){
          alert('모든 필수 정보를 입력해주세요');
          return;
        }
        const formData = {
            userNickName,
            userId,
            imageUrl,
        };
        
        console.log('데이터 생성 완료')
        console.log(formData);
        sendDataToBackend(formData);

        onClose();
      };
      
      useEffect(() => {
        const fetchUserProfileData = async () => {
          try {
            const response = await instance.get('/user');
            const data = response.data.result;
    
            setUserProfileDate(data);
    
          } catch (error) {
            console.error('Failed to fetch user data', error);
          }
       };  
       fetchUserProfileData();
      }, []);

    return (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalTop}>
              <ProfileEditIcon />
              <button className={styles.closeButton} onClick={onClose}>
                <ModalClose />
              </button>
            </div>
            <div className={styles.userProfilePicBox}>
                 <img
                          src={userProfileData.imgUrl}
                          alt="profileImage"
                          className={styles.userProfilePic}
                />
            </div>

            <div className={styles.getNickName}>
              <input
                type="text"
                className={styles.getNickNameInput}
                value={userNickName}
                onChange={(e) => setUserNickName(e.target.value)} 
                placeholder="닉네임"
              />
            </div>
            <div className={styles.alertNickName}>
                <FontAlert />
                <div>3~12글자 이내</div>
            </div>

            <div className={styles.getId}>
              <input
                type="text"
                className={styles.getIdInput}
                value={userId}
                onChange={(e) => setUserId(e.target.value)} 
                placeholder="아이디"
              />
            </div>
            <div className={styles.alertId}>
                <div className={styles.alertLettersCount}>
                    <FontAlert />
                    <div>3~20글자 이내</div>
                    </div>
                    <div className={styles.alertLettersStyle}>
                    <FontAlert />
                    <div>영문 소문자,숫자,특수문자(._) 사용</div>
                </div>
            </div>

            <div className={`${styles.createBtn} ${getButtonStyle()}`}>
              <div 
                
              onClick={handleSubmit}>적용하기</div>
            </div>
          </div>
        </div>
      );
}

export default ProfileEdit;