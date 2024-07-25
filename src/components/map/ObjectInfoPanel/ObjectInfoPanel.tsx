import styles from './ObjectInfoPanel.module.scss';
import PublishLinkContainer from './PublishLinkContainer';

interface Props {
  mode: string;
}

const ObjectInfoPanel: React.FC<Props> = ({ mode }) => {
  return (
    <div id={styles.objectInfoPanel}>
      <PublishLinkContainer mode={mode} />
    </div>
  );
};

export default ObjectInfoPanel;
