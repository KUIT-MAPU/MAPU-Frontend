import styles from './PublishLinkContainer.module.scss';
import publicStyles from '../ObjectContainerPublicStyle.module.scss';
import { useMapBasicInfoQuery } from '../../../../apis/Map/fetchMapBasicInfo';
import useMapInfoStore from '../../../../stores/mapInfoStore';
import PublishBtn from '../../../../assets/map/btn_publish.svg';
import PublishCancelBtn from '../../../../assets/map/btn_cancel_publish.svg';
import CopyLinkBtn from '../../../../assets/map/btn_link_copy.svg';
import { MapMode } from '../../../../types/enum/MapMode';

interface Props {
  mode: MapMode;
  mapId: number;
}

const PublishLinkContainer: React.FC<Props> = ({ mode, mapId }) => {
  const { publicLink, objectOutlineList } = useMapInfoStore();
  const { mapBasicInfo } = useMapBasicInfoQuery(mapId, mode);

  const handleCopyLink = async () => {
    //클립보드에 공유 링크 복사
    try {
      await navigator.clipboard.writeText(`${publicLink}`);
    } catch (e) {
      //TODO: 에러 상태로 설정
      alert('공유 링크 복사에 실패하였습니다.');
    }
  };

  const handleSwitchIsPublished = () => {
    //TODO: 게시 여부 설정 api 호출
  };

  //editor
  if (mode === 'edit')
    return (
      <section
        className={`${styles.objectInfoHeader} ${styles.publishContainer}`}
      >
        {mapBasicInfo !== undefined && mapBasicInfo.result.published ? (
          <div className={publicStyles.publicTextContainer}>
            <span className={publicStyles.boxTitle}>지도 게시 취소하기</span>
            <span className={publicStyles.publicDescription}>
              공개된 지도가 비공개됩니다
            </span>
          </div>
        ) : objectOutlineList.length === 0 ? (
          <div className={publicStyles.publicTextContainer}>
            <span
              className={`${publicStyles.boxTitle} ${publicStyles.cannotPublishBoxTitle}`}
            >
              지도 게시하기
            </span>
            <span
              className={`${publicStyles.publicDescription} ${publicStyles.cannotPublishDescription}`}
            >
              내 지도가 모두에게 공개됩니다
            </span>
          </div>
        ) : (
          <div className={publicStyles.publicTextContainer}>
            <span className={publicStyles.boxTitle}>지도 게시하기</span>
            <span className={publicStyles.publicDescription}>
              내 지도가 모두에게 공개됩니다
            </span>
          </div>
        )}
        {mapBasicInfo !== undefined && mapBasicInfo.result.published ? (
          <button
            type="button"
            className={styles.publishBtn}
            onClick={handleSwitchIsPublished}
          >
            <img src={PublishCancelBtn} alt="게시 취소하기" />
          </button>
        ) : objectOutlineList.length === 0 ? (
          <button
            type="button"
            className={`${styles.publishBtn} ${styles.cannotPublishBtn}`}
            disabled
          >
            <img src={PublishBtn} alt="게시하기" />
          </button>
        ) : (
          <button
            type="button"
            className={styles.publishBtn}
            onClick={handleSwitchIsPublished}
          >
            <img src={PublishBtn} alt="게시하기" />
          </button>
        )}
      </section>
    );

  //viewer
  return (
    <section
      className={`${styles.objectInfoHeader} ${styles.publicLinkContainer}`}
    >
      <span className={publicStyles.boxTitle}>지도 링크</span>
      <div className={styles.linkContainer}>
        <span className={styles.publicLink}>{publicLink}</span>
        <img
          src={CopyLinkBtn}
          alt="링크 복사하기"
          className={styles.linkCopyBtn}
          onClick={handleCopyLink}
        />
      </div>
    </section>
  );
};

export default PublishLinkContainer;
