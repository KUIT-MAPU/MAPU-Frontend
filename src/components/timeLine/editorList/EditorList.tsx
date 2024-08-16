import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import EditorProfileCard from './EditorProfileCard';
import { fetchEditorData } from '../../../apis/editors/useGetEditorsData';
import useRegisterStore from '../../../stores/registerStore';

import styles from './EditorList.module.scss';

interface EditorListProps {
  className?: string;
  isLog: boolean;
  token: string|undefined;
}

const EditorList: React.FC<EditorListProps> = ({ className, isLog, token }) => {

  const { data: editorData, refetch } = useQuery(
    ['editorsData', token], 
    () => fetchEditorData(token),
    {
      enabled: true,
      refetchOnWindowFocus: false, 
    }
  );

  const handleRefreshClick = () => {
    refetch();
  };

  return (
    <div className={className}>
      <div className={styles.titleBar}>
        <div className={styles.title}>추천 에디터</div>
        <button className={styles.refreshBtn} onClick={handleRefreshClick}>
          <span>새로고침</span>
        </button>
      </div>

      <div className={styles.editorProfiles}>
        {editorData &&
          editorData.map((editor) => (
            <EditorProfileCard Editor={editor} key={editor.userId} token={token} isLog={isLog} />
          ))}
      </div>
    </div>
  );
};

export default EditorList;
