import styles from './ObjectInfoPanel.module.scss';
import PublishLinkContainer from './PublishLinkContainer';
import ObjectBasicInfoContainer from './ObjectBasicinfoContainer';

interface Props {
  mode: string;
}

const ObjectInfoPanel: React.FC<Props> = ({ mode }) => {
  return (
    <div id={styles.objectInfoPanel}>
      <PublishLinkContainer mode={mode} />
      <ObjectBasicInfoContainer mode={mode} />
    </div>
  );
};

export default ObjectInfoPanel;
