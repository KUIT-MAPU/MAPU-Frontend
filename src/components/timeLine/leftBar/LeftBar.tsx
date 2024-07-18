import React from 'react';
import EditorList from '../editorList/EditorList';
import KeywordList from '../keywordList/KeywordList';
import styles from './LeftBar.module.scss';
import useKeywordStore from '../../../stores/keywordStore';
import { KeywordType } from '../../../types/KeywordType';

const LeftBar: React.FC = () => {
  const { selectedList } = useKeywordStore();

  return (
    <>
      <div className={styles.leftBar}>
        <EditorList className={styles.editorList} />
        <div className={styles.border}></div>
        <KeywordList className={styles.keywordList} />
      </div>
    </>
  );
};

export default LeftBar;
