import React from 'react';

import { EditorType } from '../../../types/getEditors/EditorType';
import useRegisterStore from '../../../stores/registerStore';
import { RegisterStatus } from '../../../types/enum/RegisterStatus';

import styles from './EditorProfileCard.module.scss';
import userImg from '../../../assets/img_user_default_profile.svg'

interface ProfileCardProps {
  Editor: EditorType;
}

const EditorProfileCard: React.FC<ProfileCardProps> = ({ Editor }) => {
  const { registerStatus, setLoginNeededStatus } = useRegisterStore();

  const isLoggedIn = () => {
    return registerStatus === RegisterStatus.LOG_IN;
  };

  const handleFollow = () => {
    if (!isLoggedIn()) {
      setLoginNeededStatus(true);
    }
  };

  return (
    <div className={styles.cardRoot}>
      <div className={styles.editorInfo}>
        <img className={styles.editorImg} src={Editor.image ? Editor.image : userImg} alt="Editor Image" />

        <div className={styles.editorNameNid}>
          <div className={styles.editorName}>{Editor.nickname}</div>
          <span className={styles.editorId}>@{Editor.profileId}</span>
        </div>
      </div>

      <button className={styles.following} onClick={handleFollow}>
        팔로잉
      </button>

      {/* {showLoginModal && <LoginModal className={styles.LoginModal} laterBtnClick={}/>} */}
    </div>
  );
};

export default EditorProfileCard;
