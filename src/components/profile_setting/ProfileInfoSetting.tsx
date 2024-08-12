import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import styles from './ProfileInfoSetting.module.scss';

import useSignUpMutation from '../../apis/auth/useSignUpMutation';

import NicknameInput from './input/NicknameInput';
import IdInput from './input/IdInput';
import UserDefaultImage from '../../assets/img_user_default_profile.svg';
import ProfileEditPen from '../../assets/btn_profile_edit_pen.svg';

import useRegisterStore from '../../stores/registerStore';
import { RegisterStatus } from '../../types/enum/RegisterStatus';

const ProfileInfoSetting = () => {
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

  //시작/적용하기 눌렀을 때
  const [idDuplicatedError, setIdDuplicatedError] = useState<boolean>(false); //사용 중인 아이디인지

  const signUpMutation = useSignUpMutation(prevUrl);

  useEffect(() => {
    if (id === undefined || nickname === undefined) {
      setIsComplete(false);
      return;
    }

    if (!isNicknameEmpty && !isIdEmpty && isValidNickname && isValidId)
      setIsComplete(true);
    else setIsComplete(false);
  }, [isNicknameEmpty, isValidNickname, isIdEmpty, isValidId]);

  const handleProfileSettingSubmit = async () => {
    //TODO: profileId 중복 검사

    const formData = new FormData();
    imgFile && formData.append('imageFile', imgFile);
    const requestDTO = JSON.stringify({
      nickname: nickname,
      profileId: id,
    });
    formData.append('requestDTO', requestDTO);

    //TODO: 회원가입 api 연결
    await signUpMutation.mutate(formData);
  };

  const onChangeIamge = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //이미지 압축
    if (!e.target.files) return;
    const file = e.target.files[0];
    setImgFile(file);

    const options = {
      maxSizeMB: 0.6,
      maxWidthOrHeight: 512,
    };
    const compressedFile = await imageCompression(file, options);
    setImagePreview(URL.createObjectURL(compressedFile));
  };

  return (
    <div className={styles.profileInfoContainer}>
      <div className={styles.userImgContainer}>
        <div className={styles.userImg}>
          <div className={styles.userImg__view}>
            <img
              src={imagePreview ? `${imagePreview}` : `${UserDefaultImage}`}
              alt="사용자 기본 프로필 이미지"
            />
            <input
              type="file"
              id="user-profile-img"
              className={styles.profileEditInput}
              accept=".jpg, .jpeg, .png"
              onChange={onChangeIamge}
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
            isNicknameEmpty={isNicknameEmpty}
            isValidNickname={isValidNickname}
            setIsNicknameEmpty={setIsNicknameEmpty}
            setIsValidNickname={setIsValidNickname}
            setNickname={setNickname}
          />
          <IdInput
            isIdEmpty={isIdEmpty}
            isValidId={isValidId}
            setIsIdEmpty={setIsIdEmpty}
            setIsValidId={setIsValidId}
            setId={setId}
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
