import React, { useEffect, useState } from 'react';
import styles from './KeywordList.module.scss';
//keywordodata types 폴더에서 import

interface KeywordListProps {
  className?: string;
}

const KeywordList: React.FC<KeywordListProps> = ({ className }) => {
  const [keywordData, setKeywordData] = useState<any>(null); // any => keyword[]
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [selectKeyword, setSelectKeyword] = useState<any | null>(null);
  const [isSelect, setIsSelect] = useState<{[key:number]:boolean}>({});
  const [error, setError] = useState<string | null>(null);

  const fetchKeywordData = async () => {
    try {
      //api data
    } catch (error){
      setError('정보를 불러올 수 없음.');
    }
  }

  useEffect(()=> {
    if(isRefresh) {
      fetchKeywordData();
      setIsRefresh(false);
      console.log('새로고침 누름',isRefresh);
    }
    console.log('isRefresh',isRefresh);
  },[isRefresh])

  //useEffect(() => {
  //  const selected = keywordData?.filter(keyword => isSelect[keyword.id]);
  //  if (selected) {
  //    setSelectedKeywords(selected);
  //  }
  //}, [isSelect, keywordData]);

  const handleRefreshClick = () => {
    setIsRefresh(true);
  }

  //const handleSelectPills = (keyword: Keyword) => {
  //  setIsSelect(prevState => ({
  //    ...prevState,
  //    [keyword.id]: !prevState[keyword.id],
  //  }));
  //};

  

  return (
    <div className={className}>
      <div className={styles.titleBar}>
        <div className={styles.title}>추천 키워드</div>
        <button className={styles.refreshBtn} onClick={handleRefreshClick}>
          <span className={styles.refreshBtnContent}>새로고침</span>
        </button>

      {/*  {Object.keys(isSelect).filter((key) => isSelect[key]).length === 5 && (
        <div>선택된 키워드가 5개입니다. 새로고침을 할 수 없습니다.</div>
      )}*/}

      </div>

      <div className={styles.keywords}>
        { keywordData &&
          keywordData.map((keyword : any) => (
            <button className="keywordPills" key= {keyword.id}>
              {keyword.name}
            </button>
          ))
        }
      </div>
    </div>
  );
};

export default KeywordList;
