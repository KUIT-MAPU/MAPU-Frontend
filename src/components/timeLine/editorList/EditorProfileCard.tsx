import React, { useState } from 'react';
import styles from './EditorProfileCard.module.scss';
import dimmedStyles from '../Dimmed.module.scss';
import { EditorType } from '../../../types/EditorType';
import useRegisterStore from '../../../stores/registerStore';
import { RegisterStatus } from '../../../types/RegisterStatus';

import AuthContainer from '../../login/AuthContainer';

interface ProfileCardProps {
  Editor: EditorType;
}

const EditorProfileCard: React.FC<ProfileCardProps> = ({ Editor }) => {
  const { registerStatus, setLoginNeeded } = useRegisterStore();

  const isLoggedIn = () => {
    return registerStatus === RegisterStatus.LOG_IN;
  };

  const handleFollow = () => {
    if (!isLoggedIn()) {
      setLoginNeeded(true);
    }
  };

  return (
    <div className={styles.cardRoot}>
      <div className={styles.editorInfo}>
        <img className={styles.editorImg} src={Editor.img} alt="Editor Image" />

        <div className={styles.editorNameNid}>
          <div className={styles.editorName}>{Editor.name}</div>
          <span className={styles.editorId}>@{Editor.userId}</span>
        </div>
      </div>

      <button className={styles.following} onClick={handleFollow}>
        {Editor.following ? '팔로잉' : '팔로우'}
      </button>

      {/* {showLoginModal && <LoginModal className={styles.LoginModal} laterBtnClick={}/>} */}
    </div>
  );
};

export default EditorProfileCard;
