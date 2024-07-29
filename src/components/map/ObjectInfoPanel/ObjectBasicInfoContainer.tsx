import styles from './ObjectBasicInfoContainer.module.scss';
import publicStyles from './ObjectContainerPublicStyle.module.scss';
import {
  EditorObjectBasicInfo,
  ViewerObjectBasicInfo,
} from '../../../types/map/object/ObjectBasicInfo';
import { ObjectShape } from '../../../types/enum/ObjectShape';

interface Props {
  mode: string;
}

/*
export interface EditorObjectBasicInfo {
  shape: ObjectShape;
  roadNameAddress: string;
  length?: string; //길이 - 선
  perimeter?: string; //둘레 - 면
  area?: string; //면적 - 면
}
export interface ViewerObjectBasicInfo {
  shape: ObjectShape;
  name: string;
  roadNameAddress: string;
  detailAddress: string;
  length?: string; //길이 - 선
  perimeter?: string; //둘레 - 면
  area?: string; //면적 - 면
}
*/
const ObjectBasicInfoContainer: React.FC<Props> = ({ mode }) => {
  // const editorObjectMockData: EditorObjectBasicInfo = {
  //   shape: ObjectShape.PLANE,
  //   roadNameAddress: '서울시 광진구 능동로 120',
  //   perimeter: '100m',
  //   area: '1㎡',
  // };
  // const editorObjectMockData: EditorObjectBasicInfo = {
  //   shape: ObjectShape.LINE,
  //   roadNameAddress: '서울시 광진구 능동로 120',
  //   length: '100m',
  // };
  const editorObjectMockData: EditorObjectBasicInfo = {
    shape: ObjectShape.POINT,
    roadNameAddress: '서울시 광진구 능동로 120',
  };

  // const viewerObjectMockData: ViewerObjectBasicInfo = {
  //   shape: ObjectShape.POINT,
  //   name: '마우스래빗',
  // detailAddress: '메가커피 골목 안쪽',
  // };
  const viewerObjectMockData: ViewerObjectBasicInfo = {
    shape: ObjectShape.LINE,
    name: '건대 카페 투어',
    roadNameAddress: '서울시 광진구 능동로 120',
    detailAddress: '건대 중문에서 시작',
    length: '200m',
  };

  //editor
  if (mode === 'edit')
    return (
      <section className={styles.objectBasicInfoContainer}>
        <span className={publicStyles.boxTitle}>객체 기본 정보</span>
        <div className={styles.basicInfoContainer}>
          <div className={styles.basicInfoTextContainer}>
            <span className={publicStyles.publicGray14}>도형</span>
            <span className={styles.infoValue}>
              {editorObjectMockData.shape}
            </span>
          </div>
          <div className={styles.basicInfoTextContainer}>
            <span className={publicStyles.publicGray14}>도로명 주소</span>
            <span className={styles.infoValue}>
              {editorObjectMockData.roadNameAddress}
            </span>
          </div>
          {editorObjectMockData.shape === ObjectShape.LINE && (
            <div className={styles.basicInfoTextContainer}>
              <span className={publicStyles.publicGray14}>도형 길이</span>
              <span className={styles.infoValue}>
                {editorObjectMockData.length}
              </span>
            </div>
          )}
          {editorObjectMockData.shape === ObjectShape.PLANE && (
            <>
              <div className={styles.basicInfoTextContainer}>
                <span className={publicStyles.publicGray14}>도형 면적</span>
                <span className={styles.infoValue}>
                  {editorObjectMockData.area}
                </span>
              </div>
              <div className={styles.basicInfoTextContainer}>
                <span className={publicStyles.publicGray14}>도형 둘레</span>
                <span className={styles.infoValue}>
                  {editorObjectMockData.perimeter}
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
          <span className={styles.infoValue}>{viewerObjectMockData.name}</span>
        </div>
        <div className={styles.basicInfoTextContainer}>
          <span className={publicStyles.publicGray14}>도로명 주소</span>
          <span className={styles.infoValue}>
            {viewerObjectMockData.roadNameAddress}
          </span>
        </div>
        <div className={styles.basicInfoTextContainer}>
          <span className={publicStyles.publicGray14}>상세 주소</span>
          <span className={styles.infoValue}>
            {viewerObjectMockData.detailAddress}
          </span>
        </div>
        <div className={styles.basicInfoTextContainer}>
          <span className={publicStyles.publicGray14}>도형</span>
          <span className={styles.infoValue}>{viewerObjectMockData.shape}</span>
        </div>
        {viewerObjectMockData.shape === ObjectShape.LINE && (
          <div className={styles.basicInfoTextContainer}>
            <span className={publicStyles.publicGray14}>도형 길이</span>
            <span className={styles.infoValue}>
              {viewerObjectMockData.length}
            </span>
          </div>
        )}
        {viewerObjectMockData.shape === ObjectShape.PLANE && (
          <>
            <div className={styles.basicInfoTextContainer}>
              <span className={publicStyles.publicGray14}>도형 면적</span>
              <span className={styles.infoValue}>
                {viewerObjectMockData.area}
              </span>
            </div>
            <div className={styles.basicInfoTextContainer}>
              <span className={publicStyles.publicGray14}>도형 둘레</span>
              <span className={styles.infoValue}>
                {viewerObjectMockData.perimeter}
              </span>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ObjectBasicInfoContainer;
