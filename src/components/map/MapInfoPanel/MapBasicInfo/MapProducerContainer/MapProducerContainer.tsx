import { useState } from 'react';
import styles from './MapProducerContainer.module.scss';
import { MapProducerInfo } from '../../../../../types/map/MapProducerInfo';
import useRegisterStore from '../../../../../stores/registerStore';
import { RegisterStatus } from '../../../../../types/enum/RegisterStatus';

const MapProducerConatiner = () => {
  const [mockData, setMockData] = useState<MapProducerInfo>({
    profileId: 'mockUser',
    profileImgUrl: 'http://placehold.co/32x32',
    nickname: 'producer',
    amIFollowing: false,
  });
  const { registerStatus, setLoginNeeded } = useRegisterStore();

  const handleFollowBtn = () => {
    if (registerStatus !== RegisterStatus.LOG_IN) setLoginNeeded(true);
    else {
      //TODO: 팔로우 api
      setMockData((state) => {
        return { ...state, amIFollowing: true };
      });
    }
  };

  return (
    <div className={styles.mapProducerContainer}>
      <div className={styles.mapProducer__info}>
        <img src={mockData.profileImgUrl} alt="프로필 이미지" />
        <span>{mockData.nickname}</span>
      </div>
      {mockData.amIFollowing ? (
        <button type="button" className={styles.followBtn} disabled>
          팔로잉
        </button>
      ) : (
        <button
          type="button"
          className={styles.followBtn}
          onClick={handleFollowBtn}
        >
          팔로우
        </button>
      )}
    </div>
  );
};

export default MapProducerConatiner;
