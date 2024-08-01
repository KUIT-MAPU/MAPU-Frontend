import React, { useEffect, useState } from 'react';

import { KeywordType } from '../../../types/KeywordType';
import { useKeywordStore, useAllKeywordStore } from '../../../stores/keywordStore';
import useRegisterStore from '../../../stores/registerStore';
import { RegisterStatus } from '../../../types/enum/RegisterStatus';

import styles from './KeywordList.module.scss';

import ico_info from '../../../assets/ico_info_gray.svg';

interface KeywordListProps {
  className?: string;
}

const mockData: KeywordType[] = [
  { id: 1, title: '동대문시장 골목맛집', selected: false },
  { id: 2, title: '서울 타워 야경 관람', selected: false },
  { id: 3, title: '홍대 놀이터 스트리트 퍼포먼스', selected: false },
  { id: 4, title: '강남역 카페 투어', selected: false },
  { id: 5, title: '코엑스 쇼핑몰 쇼핑 추천', selected: false },
];

const KeywordList: React.FC<KeywordListProps> = ({ className }) => {
  const { registerStatus } = useRegisterStore();
  const { selectedList, setSelectedList } = useKeywordStore();
  const { allKeywordList, setAllKeywordList } = useAllKeywordStore();
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);

  const [isLog, setIsLog] = useState<boolean>(false);

  const fetchKeywordData = async () => {
    try {
      // TODO: 실제 API 호출로 데이터 받아오기
      setAllKeywordList(mockData);
    } catch (error) {
      console.error('정보를 불러올 수 없음.');
    }
  };

  useEffect(() => {
    fetchKeywordData();

    if (registerStatus === RegisterStatus.LOG_IN) {
      setIsLog(true);
    } else {
      setIsLog(false);
    }
  }, [registerStatus]);

  useEffect(() => {
    if (!isLog && selectedList.length === 0) {
      const selectedInit = allKeywordList.slice(0, 2).map((item: KeywordType) => {
        item.selected = !item.selected;
        return item;
      });
      setSelectedList(selectedInit);
    }
  }, [isLog, allKeywordList]);

  useEffect(() => {
    if (isRefresh) {
      const falseKeyword = allKeywordList.filter(
        (keyword: KeywordType) => !keyword.selected,
      );

      const refreshDatas = allKeywordList.filter(
        (keyword: KeywordType) =>
          !falseKeyword.some(
            (falseKeywordItem: KeywordType) =>
              falseKeywordItem.id === keyword.id,
          ),
      );

      const updatedKeywordList = [...selectedList, ...falseKeyword];

      if (JSON.stringify(allKeywordList) !== JSON.stringify(updatedKeywordList)) {
        setAllKeywordList(updatedKeywordList);
      }

      setIsRefresh(false);
    }
  }, [isRefresh]);

  // useEffect(() => {
  //   setSelectedList(selectedList); // 쿠키 업데이트를 위해 상태를 설정합니다.
  // }, [selectedList, setSelectedList]);

  const handleRefreshClick = () => {
    if (selectedList.length === 5) {
      setAlert(true);
    } else {
      setIsRefresh(true);
    }
  };

  const handleSelectPills = (selectedKeyword: KeywordType) => {
    selectedKeyword.selected = !selectedKeyword.selected; // toogle
    console.log('keyword data:', allKeywordList);
    const updatedList = allKeywordList.filter((item) => item.selected);
    setAllKeywordList(allKeywordList);
    setSelectedList(updatedList);

    if (updatedList.length < 5) {
      setAlert(false);
    }
  };

  return (
    <div className={className}>
      <div className={styles.titleBar}>
        <div className={styles.title}>추천 키워드</div>
        <button className={styles.refreshBtn} onClick={handleRefreshClick}>
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
