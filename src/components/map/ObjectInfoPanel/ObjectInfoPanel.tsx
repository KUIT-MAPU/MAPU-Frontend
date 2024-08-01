import styles from './ObjectInfoPanel.module.scss';
import PublishLinkContainer from './PublishLinkContainer';
import ObjectBasicInfoContainer from './ObjectBasicInfoContainer';
import EditorObjectInfoInputContainer from './EditorObjectInfoInputContainer';
import OjbectPropertyContainer from './OjbectPropertyContainer/ObjectPropertyContainer';
import { ObjectBasicInfo } from '../../../types/map/object/ObjectBasicInfo';
import { ObjectShape } from '../../../types/enum/ObjectShape';

interface Props {
  mode: string;
}

const ObjectInfoPanel: React.FC<Props> = ({ mode }) => {
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
  // const editorObjectMockData: EditorObjectBasicInfo = {
  //   shape: ObjectShape.POINT,
  //   roadNameAddress: '서울시 광진구 능동로 120',
  // };

  // const viewerObjectMockData: ViewerObjectBasicInfo = {
  //   shape: ObjectShape.POINT,
  //   name: '마우스래빗',
  //   roadNameAddress: '서울시 광진구 능동로 120',
  //   detailAddress: '메가커피 골목 안쪽',
  // };
  // const viewerObjectMockData: ViewerObjectBasicInfo = {
  //   shape: ObjectShape.LINE,
  //   name: '건대 카페 투어',
  //   roadNameAddress: '서울시 광진구 능동로 120',
  //   detailAddress: '건대 중문에서 시작',
  //   length: '200m',
  // };
  const objectMockData: ObjectBasicInfo = {
    shape: ObjectShape.PLANE,
    name: '마우스래빗',
    roadNameAddress: '서울시 광진구 능동로 120',
    detailAddress: '메가커피 골목 안쪽',
    perimeter: '100m',
    area: '100㎡',
  };
  return (
    <div id={styles.objectInfoPanel}>
      <PublishLinkContainer mode={mode} />
      <ObjectBasicInfoContainer mode={mode} object={objectMockData} />
      {mode === 'edit' && (
        <EditorObjectInfoInputContainer
          name={objectMockData.name}
          detailAddress={objectMockData.detailAddress}
        />
      )}
      <OjbectPropertyContainer mode={mode} shape={objectMockData.shape} />
    </div>
  );
};

export default ObjectInfoPanel;
