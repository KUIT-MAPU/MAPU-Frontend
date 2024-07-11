import React, { useEffect, useState } from 'react';
import styles from './EditorList.module.scss';
//editrodata types 폴더에서 import

interface EditorListProps {
  className?: string;
}

const EditorList: React.FC<EditorListProps> = ({ className }) => {
  const [editorData, setEditorData] = useState<any>(null); // any : types 폴더에 interface로 저장할 예정
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEditorData = async () => {
    try {
      //api data
    } catch (error){
      setError('정보를 불러올 수 없음.');
    }
  }

  useEffect(()=> {
    if(isRefresh) {
      fetchEditorData();
      setIsRefresh(false);
      console.log('새로고침 누름',isRefresh);
    }
    console.log('isRefresh',isRefresh);
  },[isRefresh])

  const handleRefreshClick = () => {
    setIsRefresh(true);
  }

  return (
    <div className={className}>
      <div className={styles.titleBar}>
        <div className={styles.title}>추천 에디터</div>
        <button className={styles.refreshBtn} onClick={handleRefreshClick}>
          <span className={styles.refreshBtnContent}>새로고침</span>
        </button>
      </div>

      <div className={styles.editorProfile}></div>
    </div>
  );
};

export default EditorList;
