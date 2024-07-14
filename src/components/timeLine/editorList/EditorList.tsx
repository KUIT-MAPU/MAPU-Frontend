import React, { useEffect, useState } from 'react';
import styles from './EditorList.module.scss';
import EditorProfileCard from './EditorProfileCard';
import { EditorType } from '../../../types/EditorType';

interface EditorListProps {
  className?: string;
}

const mockData: EditorType[] = [
  { id: 1, userId: 'alice123', img: 'https://via.placeholder.com/150', name: 'Alice', following: true },
  { id: 2, userId: 'bob456', img: 'https://via.placeholder.com/150', name: 'Bob', following: false },
  { id: 3, userId: 'charlie789', img: 'https://via.placeholder.com/150', name: 'Charlie', following: true },
  { id: 4, userId: 'david101', img: 'https://via.placeholder.com/150', name: 'David', following: false },
  { id: 5, userId: 'eva202', img: 'https://via.placeholder.com/150', name: 'Eva', following: true }
];


const EditorList: React.FC<EditorListProps> = ({ className }) => {
  const [editorData, setEditorData] = useState<EditorType[]>([]);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(()=>{
    fetchEditorData();
  }
  ,[]);

  const fetchEditorData = async () => {
    try {
      //api data
      setEditorData(mockData);
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

  console.log('editorData :',editorData);
  
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


      <div className={styles.editorProfiles}>
        {editorData && 
          editorData.map((editor) => (
            <EditorProfileCard Editor={editor} />
          ))
        }
      </div>
    </div>
  );
};

export default EditorList;
