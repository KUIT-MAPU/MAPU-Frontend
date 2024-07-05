import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import styles from './ProfileInfoSetting.module.scss';

import useSignUpMutation from '../../apis/auth/useSignUpMutation';
import useProfileEditMutation from '../../apis/auth/useProfileEditMutation'

import NicknameInput from './input/NicknameInput';
import IdInput from './input/IdInput';
import UserDefaultImage from '../../assets/img_user_default_profile.svg';
import ProfileEditPen from '../../assets/btn_profile_edit_pen.svg';

import useRegisterStore from '../../stores/registerStore';
import { RegisterStatus } from '../../types/enum/RegisterStatus';
import UserProfile from '../../pages/UserProfile/UserProfile';

import instance from '../../apis/instance';
import { profile } from 'console';
const ProfileInfoSetting = (props:any) => {
  const prevUrl = useLocation().pathname.split('?')[0];

  const { registerStatus } = useRegisterStore();

  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>(); //TODO: api 호출에 필요
  const [id, setId] = useState<string>();
  const [imgFile, setImgFile] = useState<File>();
  const [imagePreview, setImagePreview] = useState<string>();

  //실시간 유효성 검사
  const [isNicknameEmpty, setIsNicknameEmpty] = useState<boolean>(false);
  const [isValidNickname, setIsValidNickname] = useState<boolean>(true);

  const [isIdEmpty, setIsIdEmpty] = useState<boolean>(false);
  const [isValidId, setIsValidId] = useState<boolean>(true);

  const [userData, setUserData] = useState({
    nickname: '',
    profileId: '',
    imgUrl: '',
    imgFile: '',
  });

  const profileEditMutation = useProfileEditMutation(prevUrl);

  useEffect(() => {
    // if (id === undefined || nickname === undefined) {
    //   setIsComplete(false);
    //   return;
    // }

    if ((props.loginedId && props.loginedNickName) ||
    (!isNicknameEmpty && !isIdEmpty && isValidNickname && isValidId)){
      setIsComplete(true);
    }
    else {
      setIsComplete(false);
    }
  }, [isNicknameEmpty, isValidNickname, isIdEmpty, isValidId]);

  
  const sendDataToBackend = async (data:any) => {
    try {
      const response = await instance.patch('/user', data);
      console.log('Data sent successfully:', response.data);
    } catch (error) {
      console.error('Failed to send data:', error);
    }
  };
  

  const handleProfileSettingSubmit = async (event:any) => {
    event.preventDefault();

    const formData = new FormData();

    //닉네임과 ID, 이미지 URL 추가
    const requestJson = JSON.stringify({
      nickname:nickname || userData.nickname,
      profileId: id || userData.profileId,
      imageUrl: userData.imgUrl,
    })
    const requestDTO = new Blob([requestJson], { type: 'application/json' });
    formData.append('requestDTO', requestDTO);

    // 새로 업로드된 이미지가 있다면 추가, 없으면 imageFile에 null 추가
    if (imgFile) {
      formData.append('imageFile', imgFile); // 새로운 이미지 파일 추가
    } else {
      formData.append('imageFile', ""); // 기존 이미지를 사용하는 경우 null처럼 빈 문자열로 추가
    }
    // const formData = {
    //   nickname,
    //   id,
    //   imageUrl: "https://profile-image-s3-bucket-mapu-backend.s3.ap-northeast-2.amazonaws.com/soju.png/2024-08-08T03%3A37%3A25.889237300",
    //   imageFile: null,
    // };
    await profileEditMutation.mutate(formData);
    
    console.log('데이터 생성 완료')
    console.log(formData);
    sendDataToBackend(formData);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await instance.get('/user');
        const data = response.data.result;

        setUserData({
          nickname: data.nickname,
          profileId: data.profileId,
          imgUrl: data.imgUrl,
          imgFile: data.imgFile,
        });
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };  //로그인 한 유저 정보 받아오기
    

    fetchUserData();
  }, []);


  return (
    <div className={styles.profileInfoContainer}>
      <div className={styles.userImgContainer}>
        <div className={styles.userImg}>
          <div className={styles.userImg__view}>
            <img
              src={userData.imgUrl}
              alt="사용자 기본 프로필 이미지"
            />
            <input
              type="file"
              id="user-profile-img"
              className={styles.profileEditInput}
              accept=".jpg, .jpeg, .png"
            />
          </div>
          <label htmlFor="user-profile-img" className={styles.profileEditBtn}>
            <img src={ProfileEditPen} alt="프로필 이미지 편집 버튼" />
          </label>
        </div>
      </div>
      <div className={styles.userDataContainer}>
        <div className={styles.inputContainer}>
          <NicknameInput
            initialNickName={props.loginedNickName}
            isNicknameEmpty={isNicknameEmpty}
            isValidNickname={isValidNickname}
            setIsNicknameEmpty={setIsNicknameEmpty}
            setIsValidNickname={setIsValidNickname}
            setNickname={setNickname}
            value={userData.nickname}
          />
          <IdInput
            initialId={props.loginedId}
            isIdEmpty={isIdEmpty}
            isValidId={isValidId}
            setIsIdEmpty={setIsIdEmpty}
            setIsValidId={setIsValidId}
            setId={setId}
            value={userData.profileId}
          />
        </div>
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={!isComplete}
          onClick={handleProfileSettingSubmit}
        >
          {registerStatus === RegisterStatus.SIGNING_UP ? (
            <span>시작하기</span>
          ) : (
            <span>적용하기</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoSetting;
