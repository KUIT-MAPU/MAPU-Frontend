import { useEffect, useState } from 'react';
import { MapProducerInfo } from '../../../types/MapProducerInfo';
import useMapInfoStore from '../../../stores/mapInfoStore';
import styles from './MapProducerContainer.module.scss';

const mockData: MapProducerInfo = {
  profileId: 'mockUser',
  profileImgUrl: 'http://placehold.co/32x32',
  nickname: 'producer',
};

const MapProducerConatiner = () => {
  const { isMine, amIFollowing } = useMapInfoStore();
  const [mapProducerInfo, setMapProducerInfo] = useState<MapProducerInfo>({
    profileId: '',
    profileImgUrl: '',
    nickname: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isMine) {
      fetchMapProducerInfo();
    }
  }, []);

  const fetchMapProducerInfo = async () => {
    try {
      //TODO: 지도 제작자 정보 api data
      setMapProducerInfo(mockData);
    } catch (error) {
      setError('정보를 불러올 수 없음.');
    }
  };

  const handleFollowBtn = () => {
    //TODO: 팔로우 api
  };

  return (
    <div className={styles.mapProducerContainer}>
      <div className={styles.mapProducer__info}>
        <img src={mapProducerInfo.profileImgUrl} alt="프로필 이미지" />
        <span>{mapProducerInfo.nickname}</span>
      </div>
      {amIFollowing ? (
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
