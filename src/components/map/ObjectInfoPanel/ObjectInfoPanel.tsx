import styles from './ObjectInfoPanel.module.scss';

interface Props {
  mode: string;
}

const ObjectInfoPanel: React.FC<Props> = ({ mode }) => {
  return <div id={styles.objectInfoPanel}>ObjectInfoPanel</div>;
};

export default ObjectInfoPanel;
