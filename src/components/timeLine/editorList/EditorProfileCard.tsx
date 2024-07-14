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
  const registerStore = useRegisterStore();
  const [dimmed, setDimmed] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  const isLoggedIn = () => {
    return registerStore.registerStatus === RegisterStatus.LOG_IN;
  };

  const handleFollow = () => {
    if (!isLoggedIn()) {
      setShowLoginModal(true);
      setDimmed(true);
    }
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
    setDimmed(false);
  };

  return (
    <div className={styles.cardRoot}>
      {dimmed && <div className={dimmedStyles.background}></div>}
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
      {showLoginModal && <AuthContainer className={styles.AuthContainer} />}
    </div>
  );
};

export default EditorProfileCard;
