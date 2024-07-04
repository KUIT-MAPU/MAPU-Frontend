import styles from './MapProducerContainer.module.scss';
import { useMapBasicInfoQuery } from '../../../../../apis/Map/fetchMapBasicInfo';
import useRegisterStore from '../../../../../stores/registerStore';
import { RegisterStatus } from '../../../../../types/enum/RegisterStatus';
import { MapMode } from '../../../../../types/enum/MapMode';
import { UserType } from '../../../../../types/UserType';
import UserDefaultProfile from '../../../../../assets/img_user_default_profile.svg';

interface Props {
  mode: MapMode;
  mapId: number;
}

const MapProducerConatiner: React.FC<Props> = ({ mode, mapId }) => {
  const mapBasicInfo = useMapBasicInfoQuery(mapId, mode).mapBasicInfo!;
  const { registerStatus, setLoginNeededStatus } = useRegisterStore();

  const handleFollowBtn = () => {
    if (registerStatus !== RegisterStatus.LOG_IN) setLoginNeededStatus(true);
    else {
      //TODO: 팔로우 api
    }
  };

  return (
    <div className={styles.mapProducerContainer}>
      <div className={styles.mapProducer__info}>
        <img
          src={
            mapBasicInfo !== undefined
              ? mapBasicInfo.result.owner.imageUrl !== null
                ? mapBasicInfo.result.owner.imageUrl!
                : UserDefaultProfile
              : UserDefaultProfile
          }
          // src={UserDefaultProfile}
          alt="프로필 이미지"
        />
        <span>
          {mapBasicInfo.result.owner !== undefined &&
            mapBasicInfo.result.owner.nickName!}
        </span>
      </div>
      {mapBasicInfo.result.owner !== undefined &&
      mapBasicInfo.result.owner.amIFollowing ? (
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
