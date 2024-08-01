import React from 'react';

import EditorList from '../editorList/EditorList';
import KeywordList from '../keywordList/KeywordList';

import styles from './LeftBar.module.scss';

const LeftBar: React.FC = () => {
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
