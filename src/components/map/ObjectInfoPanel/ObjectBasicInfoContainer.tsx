import styles from './ObjectBasicInfoContainer.module.scss';
import publicStyles from './ObjectContainerPublicStyle.module.scss';
import { ObjectShape } from '../../../types/enum/ObjectShape';
import { ObjectBasicInfo } from '../../../types/map/object/ObjectBasicInfo';

interface Props {
  mode: string;
  object: ObjectBasicInfo;
}

const ObjectBasicInfoContainer: React.FC<Props> = ({ mode, object }) => {
  //editor
  if (mode === 'edit')
    return (
      <section className={styles.objectBasicInfoContainer}>
        <span className={publicStyles.boxTitle}>객체 기본 정보</span>
        <div className={styles.basicInfoContainer}>
          <div className={styles.basicInfoTextContainer}>
            <span className={publicStyles.publicGray14}>도형</span>
            <span className={styles.infoValue}>{object.shape}</span>
          </div>
          <div className={styles.basicInfoTextContainer}>
            <span className={publicStyles.publicGray14}>도로명 주소</span>
            <span className={styles.infoValue}>{object.roadNameAddress}</span>
          </div>
          {object.shape === ObjectShape.LINE && (
            <div className={styles.basicInfoTextContainer}>
              <span className={publicStyles.publicGray14}>도형 길이</span>
              <span className={styles.infoValue}>{object.length}</span>
            </div>
          )}
          {object.shape === ObjectShape.PLANE && (
            <>
              <div className={styles.basicInfoTextContainer}>
                <span className={publicStyles.publicGray14}>도형 면적</span>
                <span className={styles.infoValue}>{object.area}</span>
              </div>
              <div className={styles.basicInfoTextContainer}>
                <span className={publicStyles.publicGray14}>도형 둘레</span>
                <span className={styles.infoValue}>{object.perimeter}</span>
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
          <span className={styles.infoValue}>{object.name}</span>
        </div>
        <div className={styles.basicInfoTextContainer}>
          <span className={publicStyles.publicGray14}>도로명 주소</span>
          <span className={styles.infoValue}>{object.roadNameAddress}</span>
        </div>
        <div className={styles.basicInfoTextContainer}>
          <span className={publicStyles.publicGray14}>상세 주소</span>
          <span className={styles.infoValue}>{object.detailAddress}</span>
        </div>
        <div className={styles.basicInfoTextContainer}>
          <span className={publicStyles.publicGray14}>도형</span>
          <span className={styles.infoValue}>{object.shape}</span>
        </div>
        {object.shape === ObjectShape.LINE && (
          <div className={styles.basicInfoTextContainer}>
            <span className={publicStyles.publicGray14}>도형 길이</span>
            <span className={styles.infoValue}>{object.length}</span>
          </div>
        )}
        {object.shape === ObjectShape.PLANE && (
          <>
            <div className={styles.basicInfoTextContainer}>
              <span className={publicStyles.publicGray14}>도형 면적</span>
              <span className={styles.infoValue}>{object.area}</span>
            </div>
            <div className={styles.basicInfoTextContainer}>
              <span className={publicStyles.publicGray14}>도형 둘레</span>
              <span className={styles.infoValue}>{object.perimeter}</span>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ObjectBasicInfoContainer;
