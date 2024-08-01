import React, { useEffect, useState } from 'react';

import EditorProfileCard from './EditorProfileCard';
import { EditorType } from '../../../types/EditorType';
import mockData from './EditorModel';

import styles from './EditorList.module.scss';

interface EditorListProps {
  className?: string;
}


const EditorList: React.FC<EditorListProps> = ({ className }) => {
  const [editorData, setEditorData] = useState<EditorType[]>([]);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEditorData();
  }, []);

  const fetchEditorData = async () => {
    try {
      //api data
      setEditorData(mockData);
    } catch (error) {
      setError('정보를 불러올 수 없음.');
    }
  };

  useEffect(() => {
    if (isRefresh) {
      fetchEditorData();
      setIsRefresh(false);
    }
    console.log('에디터 새로고침', isRefresh);
  }, [isRefresh]);

  const handleRefreshClick = () => {
    setIsRefresh(true);
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
            <EditorProfileCard Editor={editor} key={editor.id} />
          ))}
      </div>
    </div>
  );
};

export default EditorList;
