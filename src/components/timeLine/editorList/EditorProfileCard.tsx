import React, { useEffect, useState } from 'react';

import { EditorType } from '../../../types/editors/EditorType';
import useRegisterStore from '../../../stores/registerStore';

import styles from './EditorProfileCard.module.scss';
import dimmedStyles from '../Dimmed.module.scss';
import userImg from '../../../assets/img_user_default_profile.svg'
import AuthContainer from '../../login/AuthContainer';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePostFollow } from '../../../apis/follow/usePostFollow';
import { FollowType } from '../../../types/follow/FollowType';
import { useDeleteUnFollow } from '../../../apis/follow/useDeleteUnFollow';

interface ProfileCardProps {
  Editor: EditorType;
  token: string|undefined;
  isLog: boolean;
  
}

const EditorProfileCard: React.FC<ProfileCardProps> = ({ Editor, isLog }) => {
  const { registerStatus, setLoginNeededStatus } = useRegisterStore();
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
  const [pendingUser, setPendingUser] = useState<number | null>(null);
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const Followmutation = usePostFollow();
  const UnFollowmutation = useDeleteUnFollow();

  const handleFollow = (followingId:number) => {
    setIsFollow(true);
    if (!isLog) {
      setPendingUser(followingId)
      setLoginNeededStatus(true);
      setIsOverlayVisible(true);
    } else {
      const followData: FollowType = {
        followingId: followingId,
      }
      Followmutation.mutate(followData);
    }
  };

  const handleUnFollow = (followingId:number) => {
  setIsFollow(false);
  const unfollowData : FollowType = {
    followingId: followingId,
  }
  UnFollowmutation.mutate(unfollowData);
  };


  const handleClose = () => {
    setLoginNeededStatus(false);
    const prevUrl = pathname.split('?')[0];
    navigate(prevUrl);
    setIsOverlayVisible(false);
  };

  return (
    <div className={styles.cardRoot}>
      {isOverlayVisible && (
        <>
          <div className={dimmedStyles.background} onClick={handleClose} />
          <AuthContainer className={dimmedStyles.authContainer} />
        </>
      )}
      <div className={styles.editorInfo}>
        <img
          className={styles.editorImg}
          src={Editor.image ? Editor.image : userImg}
          alt="Editor Image"
        />

        <div className={styles.editorNameNid}>
          <div className={styles.editorName}>{Editor.nickname}</div>
          <span className={styles.editorId}>@{Editor.profileId}</span>
        </div>
      </div>

      <button className={`${isFollow ? styles.unfollowing : styles.following}`} onClick={isFollow ? () => handleUnFollow(Editor.userId):() => handleFollow(Editor.userId)}>
        {isFollow ? "팔로잉" : "팔로우"}

      </button>
    </div>
  );
};

export default EditorProfileCard;
