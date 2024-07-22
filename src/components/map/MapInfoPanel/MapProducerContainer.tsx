import { useEffect, useState } from 'react';
import { MapProducerInfo } from '../../../types/MapProducerInfo';
import styles from './MapProducerContainer.module.scss';

interface Props {
  isMine: boolean;
}
const mockData: MapProducerInfo = {
  profileId: 'mockUser',
  profileImgUrl: 'http://placehold.co/32x32',
  nickname: 'producer',
};

const MapProducerConatiner: React.FC<Props> = ({ isMine }) => {
  const [amFollowing, setAmFollowing] = useState<boolean>(false);
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
      //api data
      setMapProducerInfo(mockData);
    } catch (error) {
      setError('정보를 불러올 수 없음.');
    }
  };

  return (
    <div className={styles.mapProducerContainer}>
      <div className={styles.mapProducer__info}>
        <img src={mapProducerInfo.profileImgUrl} alt="프로필 이미지" />
        <span>{mapProducerInfo.nickname}</span>
      </div>
      {amFollowing ? (
        <button type="button" className={styles.followBtn} disabled>
          팔로잉
        </button>
      ) : (
        <button type="button" className={styles.followBtn}>
          팔로우
        </button>
      )}
    </div>
  );
};

export default MapProducerConatiner;
