import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ProfileSettingModal.module.scss';
import { RegisterStatus } from '../../types/enum/RegisterStatus';
import useRegisterStore from '../../stores/registerStore';
import ProfileInfoSetting from './LogProfileInfoSetting';
import ProfileSetting from '../../assets/ico_person.svg';
import CloseBtn from '../../assets/btn_close.svg';


interface ProfileSettingModalProps {
  onClose: () => void;
}

const ProfileSettingModal: React.FC<ProfileSettingModalProps> = ({ onClose }) => {
  const { registerStatus } = useRegisterStore();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const isWelcome = pathname === '/';
  
  const handelCancel = () => {
    onClose();
  };


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
          <img src={CloseBtn} alt="취소 버튼" onClick={handelCancel} />
        </button>
      </div>

      <ProfileInfoSetting />
    </div>
  );
};

export default ProfileSettingModal;
