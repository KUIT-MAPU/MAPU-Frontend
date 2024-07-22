import { useEffect, useState } from 'react';
import styles from './MapInfoPanel.module.scss';
import { MapProducerInfo } from '../../../types/MapProducerInfo';

const MapInfoPanel = () => {
  const [isMine, setIsMine] = useState<boolean>(true);
  const [amFollowing, setAmFollowing] = useState<boolean>(false);
  const [mapProducerInfo, setMapProducerInfo] = useState<MapProducerInfo>();
  const [error, setError] = useState<string | null>(null);

  const mockData: MapProducerInfo = {
    profileId: 'mockUser',
    profileImgUrl: 'http://placehold.co/32x32',
    nickname: 'producer',
  };

  useEffect(() => {
    //TODO: 내가 제작한 지도인지 판단
    //아니라면
    //1. 상단에 지도 제작자 프로필 표시
    //2. 팔로잉 중인지 판단
    fetchMapProducerInfo();
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
    <section id={styles.mapInfoPanel}>
      {!isMine && (
        <div className={styles.mapProducerContainer}>
          <div className={styles.mapProducer__info}>
            <img src={mockData.profileImgUrl} alt="프로필 이미지" />
            <span>{mockData.nickname}</span>
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
      )}
    </section>
  );
};

export default MapInfoPanel;
