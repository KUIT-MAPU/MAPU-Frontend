import styles from './ProfileSettingModal.module.scss';

import UserDefaultImage from '../../assets/user-default-image.svg';
import ProfileEditPen from '../../assets/profile-edit-pen.svg';
import InfoGrayCircle from '../../assets/info-gray-circle.svg';
import ProfileSetting from '../../assets/profile_setting.svg';
import Close from '../../assets/close.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import useRegisterStore from '../../stores/registerStore';
import { RegisterStatus } from '../../types/RegisterStatus';

const ProfileSettingModal = () => {
  const { registerStatus } = useRegisterStore();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const isWelcome = pathname === '/';

  const handelCancel = () => {
    const prevUrl = pathname.split('?')[0];
    navigate(prevUrl); //test필요
  };

  if (isWelcome) {
    return (
      <div className={styles.welcomeProfileSettingContainer}>
        <div className={styles.userImgContainer}>
          <div className={styles.userImg}>
            <img src={UserDefaultImage} alt="사용자 기본 프로필 이미지" />
            <button type="button" className={styles.profileEditBtn}>
              <img src={ProfileEditPen} alt="프로필 이미지 편집 버튼" />
            </button>
          </div>
        </div>
        <div className={styles.userDataContainer}>
          <div className={styles.userDataInputContainer}>
            <div className={styles.inputContainer}>
              <input type="text" placeholder="닉네임을 입력하세요." />
              <div className={styles.valueInfoContainer}>
                <div className={styles.valueInfo}>
                  <img src={InfoGrayCircle} alt="회색 안내 아이콘" />
                  <span>3~12글자 이내</span>
                </div>
              </div>
            </div>
            <div className={styles.inputContainer}>
              <input type="text" placeholder="아이디를 입력하세요." />
              <div className={styles.valueInfoContainer}>
                <div className={styles.valueInfo}>
                  <img src={InfoGrayCircle} alt="회색 안내 아이콘" />
                  <span>3~20글자 이내</span>
                </div>
                <div className={styles.valueInfo}>
                  <img src={InfoGrayCircle} alt="회색 안내 아이콘" />
                  <span>한글 미사용</span>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className={styles.signUpBtn} disabled>
            <span>시작하기</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profileSettingContainer}>
      <div className={styles.titleContainer}>
        <div className={styles.infoContainer}>
          <img src={ProfileSetting} alt="프로필 세팅 아이콘" />
          {registerStatus === RegisterStatus.SIGNING_UP ? (
            <span className={styles.info__text}>회원가입</span>
          ) : (
            <span className={styles.info__text}>프로필 편집</span>
          )}
        </div>
        <button type="button" className={styles.cancelBtn}>
          <img src={Close} alt="취소 버튼" onClick={handelCancel} />
        </button>
      </div>

      <div className={styles.welcomeProfileSettingContainer}>
        <div className={styles.userImgContainer}>
          <div className={styles.userImg}>
            <img src={UserDefaultImage} alt="사용자 기본 프로필 이미지" />
            <button type="button" className={styles.profileEditBtn}>
              <img src={ProfileEditPen} alt="프로필 이미지 편집 버튼" />
            </button>
          </div>
        </div>
        <div className={styles.userDataContainer}>
          <div className={styles.userDataInputContainer}>
            <div className={styles.inputContainer}>
              <input type="text" placeholder="닉네임을 입력하세요." />
              <div className={styles.valueInfoContainer}>
                <div className={styles.valueInfo}>
                  <img src={InfoGrayCircle} alt="회색 안내 아이콘" />
                  <span>3~12글자 이내</span>
                </div>
              </div>
            </div>
            <div className={styles.inputContainer}>
              <input type="text" placeholder="아이디를 입력하세요." />
              <div className={styles.valueInfoContainer}>
                <div className={styles.valueInfo}>
                  <img src={InfoGrayCircle} alt="회색 안내 아이콘" />
                  <span>3~20글자 이내</span>
                </div>
                <div className={styles.valueInfo}>
                  <img src={InfoGrayCircle} alt="회색 안내 아이콘" />
                  <span>한글 미사용</span>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className={styles.signUpBtn} disabled>
            {registerStatus === RegisterStatus.SIGNING_UP ? (
              <span>시작하기</span>
            ) : (
              <span>적용하기</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingModal;
