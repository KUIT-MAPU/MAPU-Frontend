import styles from './ObjectInfoPanel.module.scss';
import PublishLinkContainer from './PublishLinkContainer';
import ObjectBasicInfoContainer from './ObjectBasicInfoContainer';
import EditorObjectInfoInputContainer from './EditorObjectInfoInputContainer';
import OjbectPropertyContainer from './OjbectPropertyContainer/ObjectPropertyContainer';

interface Props {
  mode: string;
}

const ObjectInfoPanel: React.FC<Props> = ({ mode }) => {
  return (
    <div id={styles.objectInfoPanel}>
      <PublishLinkContainer mode={mode} />
      <ObjectBasicInfoContainer mode={mode} />
      {mode === 'edit' && <EditorObjectInfoInputContainer />}
      <OjbectPropertyContainer mode={mode} />
    </div>
  );
};

export default ObjectInfoPanel;
