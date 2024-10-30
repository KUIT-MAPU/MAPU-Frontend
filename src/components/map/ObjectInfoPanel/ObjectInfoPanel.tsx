import styles from './ObjectInfoPanel.module.scss';
import PublishLinkContainer from './PublishLinkContainer/PublishLinkContainer';
import ObjectBasicInfoContainer from './ObjectBasicInfo/ObjectBasicInfoContainer';
import EditorObjectInfoInputContainer from './ObjectBasicInfo/EditorObjectInfoInputContainer';
import OjbectPropertyContainer from './OjbectPropertyContainer/ObjectPropertyContainer';
import { MapMode } from '../../../types/enum/MapMode';
import useMapInfoStore from '../../../stores/mapInfoStore';

interface Props {
  mode: MapMode;
  mapId: number;
}

const ObjectInfoPanel: React.FC<Props> = ({ mode, mapId }) => {
  const object = useMapInfoStore((state) => state.getSelectedObject());
  const { selectedObjectId } = useMapInfoStore();

  return (
    <div id={styles.objectInfoPanel}>
      <PublishLinkContainer mode={mode} mapId={mapId} />
      <ObjectBasicInfoContainer mode={mode} object={object} />
      {selectedObjectId !== undefined && mode === MapMode.EDIT && (
        <EditorObjectInfoInputContainer
          name={object?.name}
          detailAddress={
            object?.userAttribute.detailAddress === undefined
              ? ''
              : object?.userAttribute.detailAddress
          }
        />
      )}
      <OjbectPropertyContainer mode={mode} object={object} />
    </div>
  );
};

export default ObjectInfoPanel;
