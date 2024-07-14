import styles from './ProfileSettingModal.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { RegisterStatus } from '../../types/RegisterStatus';

import ProfileSetting from '../../assets/profile_setting.svg';
import Close from '../../assets/close.svg';

import useRegisterStore from '../../stores/registerStore';
import ProfileInfoSetting from './ProfileInfoSetting';

const ProfileSettingModal = () => {
  const { registerStatus } = useRegisterStore();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const isWelcome = pathname === '/';

  const handelCancel = () => {
    const prevUrl = pathname.split('?')[0];
    navigate(prevUrl);
  };

  if (isWelcome) {
    return <ProfileInfoSetting />;
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
        <button type="button">
          <img src={Close} alt="취소 버튼" onClick={handelCancel} />
        </button>
      </div>

      <ProfileInfoSetting />
    </div>
  );
};

export default ProfileSettingModal;
