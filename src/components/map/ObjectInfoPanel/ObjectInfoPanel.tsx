import styles from './ObjectInfoPanel.module.scss';
import PublishLinkContainer from './PublishLinkContainer';
import ObjectBasicInfoContainer from './ObjectBasicInfoContainer';
import EditorObjectInfoInputContainer from './EditorObjectInfoInputContainer';

interface Props {
  mode: string;
}

const ObjectInfoPanel: React.FC<Props> = ({ mode }) => {
  return (
    <div id={styles.objectInfoPanel}>
      <PublishLinkContainer mode={mode} />
      <ObjectBasicInfoContainer mode={mode} />
      {mode === 'edit' && <EditorObjectInfoInputContainer />}
    </div>
  );
};

export default ObjectInfoPanel;
