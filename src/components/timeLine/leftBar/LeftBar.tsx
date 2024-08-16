import React from 'react';

import EditorList from '../editorList/EditorList';
import KeywordList from '../keywordList/KeywordList';

import styles from './LeftBar.module.scss';

interface LeftBarProps {
  token: string|undefined;
  isLog: boolean;
}

const LeftBar: React.FC<LeftBarProps> = ({token, isLog}) => {
  return (
    <>
      <div className={styles.leftBar}>
        <EditorList className={styles.editorList} token={token} isLog={isLog} />
        <div className={styles.border}></div>
        <KeywordList className={styles.keywordList} isLog={isLog} token={token} />
      </div>
    </>
  );
};

export default LeftBar;
