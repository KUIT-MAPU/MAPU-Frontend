import styles from './ObjectBasicInfoContainer.module.scss';
import publicStyles from '../ObjectContainerPublicStyle.module.scss';
import { ObjectShape } from '../../../../types/enum/ObjectShape';
import { MapObject } from '../../../../types/map/object/ObjectInfo';
import useMapInfoStore from '../../../../stores/mapInfoStore';

interface Props {
  mode: string;
  object?: MapObject;
}

const ObjectBasicInfoContainer: React.FC<Props> = ({ mode, object }) => {
  const { selectedObjectId } = useMapInfoStore();

  //editor viewer 관계 없이, 객체가 선택되지 않은 경우 비활성화
  if (selectedObjectId === undefined)
    return (
      <section
        className={`${styles.objectBasicInfoContainer} ${styles.disabledBasicInfoContainer}`}
      >
        <span className={publicStyles.boxTitle}>객체 기본 정보</span>
        <div className={styles.basicInfoContainer}>
          <div className={styles.basicInfoTextContainer}>
            <span className={publicStyles.publicGray14}>도형</span>
            <span className={styles.infoValue}>선택된 객체가 없음</span>
          </div>
        </div>
      </section>
    );

  //editor
  if (mode === 'edit')
    return (
      <section className={styles.objectBasicInfoContainer}>
        <span className={publicStyles.boxTitle}>객체 기본 정보</span>
        <div className={styles.basicInfoContainer}>
          <div className={styles.basicInfoTextContainer}>
            <span className={publicStyles.publicGray14}>도형</span>
            <span className={styles.infoValue}>{object?.type}</span>
          </div>
          {/* <div className={styles.basicInfoTextContainer}>
            <span className={publicStyles.publicGray14}>도로명 주소</span>
            <span className={styles.infoValue}>
              {object?.geoAttribute?.roadNameAddress}
            </span>
          </div> */}
          {object?.type === ObjectShape.LINE && (
            <div className={styles.basicInfoTextContainer}>
              <span className={publicStyles.publicGray14}>도형 길이</span>
              <span className={styles.infoValue}>
                {object.geoAttribute?.length === undefined
                  ? ''
                  : Number(object.geoAttribute?.length).toFixed(2) + 'm'}
              </span>
            </div>
          )}
          {object?.type === ObjectShape.PLANE && (
            <>
              <div className={styles.basicInfoTextContainer}>
                <span className={publicStyles.publicGray14}>도형 면적</span>
                <span className={styles.infoValue}>
                  {object.geoAttribute?.area === undefined
                    ? ''
                    : Number(object.geoAttribute?.area).toFixed(2) + 'm²'}
                </span>
              </div>
              <div className={styles.basicInfoTextContainer}>
                <span className={publicStyles.publicGray14}>도형 둘레</span>
                <span className={styles.infoValue}>
                  {object.geoAttribute?.perimeter === undefined
                    ? ''
                    : Number(object.geoAttribute?.perimeter).toFixed(2) + 'm'}
                </span>
              </div>
            </>
          )}
        </div>
      </section>
    );

  //viewer
  return (
    <section className={styles.objectBasicInfoContainer}>
      <span className={publicStyles.boxTitle}>객체 기본 정보</span>
      <div className={styles.basicInfoContainer}>
        <div className={styles.basicInfoTextContainer}>
          <span className={publicStyles.publicGray14}>이름</span>
          <span className={styles.infoValue}>{object?.name}</span>
        </div>
        {/* <div className={styles.basicInfoTextContainer}>
          <span className={publicStyles.publicGray14}>도로명 주소</span>
          <span className={styles.infoValue}>
            {object?.geoAttribute?.roadNameAddress}
          </span>
        </div> */}
        {/* <div className={styles.basicInfoTextContainer}>
          <span className={publicStyles.publicGray14}>상세 주소</span>
          <span className={styles.infoValue}>
            {object?.userAttribute?.detailAddress}
          </span>
        </div> */}
        <div className={styles.basicInfoTextContainer}>
          <span className={publicStyles.publicGray14}>도형</span>
          <span className={styles.infoValue}>{object?.type}</span>
        </div>
        {object?.type === ObjectShape.LINE && (
          <div className={styles.basicInfoTextContainer}>
            <span className={publicStyles.publicGray14}>도형 길이</span>
            <span className={styles.infoValue}>
              {object.geoAttribute?.length === undefined
                ? ''
                : Number(object.geoAttribute?.length).toFixed(2) + 'm'}
            </span>
          </div>
        )}
        {object?.type === ObjectShape.PLANE && (
          <>
            <div className={styles.basicInfoTextContainer}>
              <span className={publicStyles.publicGray14}>도형 면적</span>
              <span className={styles.infoValue}>
                {object.geoAttribute?.area === undefined
                  ? ''
                  : Number(object.geoAttribute?.area).toFixed(2) + 'm²'}
              </span>
            </div>
            <div className={styles.basicInfoTextContainer}>
              <span className={publicStyles.publicGray14}>도형 둘레</span>
              <span className={styles.infoValue}>
                {object.geoAttribute?.perimeter === undefined
                  ? ''
                  : Number(object.geoAttribute?.perimeter).toFixed(2) + 'm'}
              </span>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ObjectBasicInfoContainer;
