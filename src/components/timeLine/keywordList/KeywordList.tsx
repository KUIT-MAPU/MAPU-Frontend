import React, { useEffect, useState } from 'react';
import { KeywordType } from '../../../types/keywords/KeywordType';
import { useKeywordStore, useAllKeywordStore } from '../../../stores/keywordStore';
import { useLocation } from 'react-router-dom';
import { useGetKeywords } from '../../../apis/keywords/useGetKeywords';
import styles from './KeywordList.module.scss';
import ico_info from '../../../assets/ico_info_gray.svg';
import { useQuery } from 'react-query';
import { fetchFollowing } from '../../../apis/follow/useGetFollowing';

interface KeywordListProps {
  className?: string;
  isLog: boolean;
  token: string | undefined;
}

const KeywordList: React.FC<KeywordListProps> = ({ className, isLog, token }) => {
  const { selectedList, setSelectedList } = useKeywordStore();
  const { allKeywordList, setAllKeywordList } = useAllKeywordStore();
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);

  const location = useLocation();
  const { refetch } = useGetKeywords();

  const { data: followingData } = useQuery(
    ['editorsData', token], 
    () => fetchFollowing(token),
    {
      enabled: true,
      refetchOnWindowFocus: false, 
    }
  );


  useEffect(() => {
    console.log('allKeywordList:', allKeywordList)
    console.log('isLog',isLog);
    console.log('selected',selectedList)
  },[allKeywordList, isLog])


  useEffect(() => {
    if (!isLog && selectedList.length === 0 && location.pathname === '/timeline') {
      const selectedInit = allKeywordList
        .slice(0, 2)
        .map((item: KeywordType) => {
          item.selected = true;
          return item;
        });
      setSelectedList(selectedInit);
    } else if (isLog && !followingData) {
      const selectedInit = allKeywordList
        .slice(0, 2)
        .map((item: KeywordType) => {
          item.selected = true;
          return item;
        });
      setSelectedList(selectedInit);
    } else {
      setSelectedList([]);
    }
  }, [isLog,location.pathname]);

  useEffect(() => {
    if (isRefresh) {
      const refreshKeyword = allKeywordList.filter((refresh) =>
        !selectedList.some((select) => refresh.title === select.title)
      );

      if(refreshKeyword.length > 5-selectedList.length) {
        const newKeyword = refreshKeyword.slice(0,5-selectedList.length);
        const updatedKeywordList = [...selectedList, ...newKeyword];
        setAllKeywordList(updatedKeywordList);
      } else {
        setAllKeywordList([...selectedList, ...refreshKeyword])
      }
      setIsRefresh(false);
    }
  }, [isRefresh]);

  const handleRefreshClick = async () => {
    if (selectedList.length === 5) {
      setAlert(true);
    } else {
      try {
        const { data } = await refetch(); 
        if(data) {
          setAllKeywordList(data);
        }
        
        setIsRefresh(true); // Trigger the refresh logic
      } catch (error) {
        console.error('Error fetching keywords:', error);
      }
    }
  };

  const handleSelectPills = (selectedKeyword: KeywordType) => {
    if (location.pathname === '/explore') {
      if (selectedKeyword.selected) return;
      const updatedList = allKeywordList.map((keyword) => ({
        ...keyword,
        selected: keyword.id === selectedKeyword.id ? true : false,
      }));

      setAllKeywordList(updatedList);
      setSelectedList(updatedList.filter((keyword) => keyword.selected));
    } else {
      selectedKeyword.selected = !selectedKeyword.selected;
      const updatedList = allKeywordList.map((item) =>
        item.id === selectedKeyword.id ? selectedKeyword : item
      );
      setAllKeywordList(updatedList);
      setSelectedList(updatedList.filter((item) => item.selected));

      if (updatedList.length < 5) {
        setAlert(false);
      }
    }
  };

  return (
    <div className={className}>
      <div className={styles.titleBar}>
        <div className={styles.title}>추천 키워드</div>
        <button className={styles.refreshBtn} onClick={handleRefreshClick} >
          <span className={styles.refreshBtnContent}>새로고침</span>
        </button>
      </div>

      <div className={styles.keywords}>
        {allKeywordList.map((keyword: KeywordType) => (
          <button
            className={keyword.selected ? styles.selected : styles.keywordPills}
            key={keyword.id}
            onClick={() => handleSelectPills(keyword)}
          >
            {keyword.title}
          </button>
        ))}
      </div>

      {alert ? (
        <div className={styles.alertComment}>
          <img src={ico_info} alt="Info Icon" />
          키워드를 해제하면 새로고침을 할 수 있습니다
        </div>
      ) : null}
    </div>
  );
};

export default KeywordList;
