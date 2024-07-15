import React, { useEffect, useState } from 'react';
import styles from './KeywordList.module.scss';
import { KeywordType } from '../../../types/KeywordType';
import ico_info from '../../../assets/ico_info.svg';
import useKeywordStore from '../../../stores/keywordStore';
import useRegisterStore from '../../../stores/registerStore';
import { RegisterStatus } from '../../../types/RegisterStatus';

interface KeywordListProps {
  className?: string;
  keywordList: KeywordType[];
}

const mockData: KeywordType[] = [
  { id: 1, title: '동대문시장 골목맛집', selected: false },
  { id: 2, title: '서울 타워 야경 관람', selected: false },
  { id: 3, title: '홍대 놀이터 스트리트 퍼포먼스', selected: false },
  { id: 4, title: '강남역 카페 투어', selected: false },
  { id: 5, title: '코엑스 쇼핑몰 쇼핑 추천', selected: false },
];

const KeywordList: React.FC<KeywordListProps> = ({ className, keywordList }) => {
  const registerStore = useRegisterStore();
  const { selectedList, setSelectedList } = useKeywordStore();

  const [keywordData, setKeywordData] = useState<KeywordType[]>([]);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);

  const [isLog, setIsLog] = useState<boolean>(false);

  useEffect(() => {
    if (registerStore.registerStatus === RegisterStatus.LOG_IN) {
      setIsLog(true);
    } else {
      setIsLog(false);
    }
  }, [registerStore.registerStatus]);

  const fetchKeywordData = async () => {
    try {
      // TODO: 실제 API 호출로 데이터 받아오기
      setKeywordData(mockData);
    } catch (error) {
      console.error('정보를 불러올 수 없음.');
    }
  };
  
  console.log(keywordData);
  console.log('로그인상태:',isLog);

  useEffect(() => {
    fetchKeywordData();
  },[]);

  useEffect(() => {
    // 미로그인 상태에서만 초기 2개 키워드를 활성화
    if (!isLog && keywordData.length > 0) {
      const initialSelectedKeywords = keywordData.slice(0, 2).map((item) => ({
        ...item,
        selected: true,
      }));
      setSelectedList(initialSelectedKeywords);
      setKeywordData(keywordData.map((item, index) =>
        index < 2 ? { ...item, selected: true } : item
      ));
    }
    // setKeywordData([...keywordData]);
  }, [isLog,keywordData]);
  
  console.log('키워드:', keywordData);
  console.log('선택한 키워드:', selectedList);

  // useEffect(() => {
  //   selectedList.map()
  // })

  useEffect(() => {
    if (isRefresh) {
      fetchKeywordData();
      setIsRefresh(false);
    }
  }, [isRefresh]);

  const handleRefreshClick = () => {
    setIsRefresh(true);
    if(selectedList.length === 5) {
      setAlert(true);
    }
  };

  const handleSelectPills = (selectedKeyword: KeywordType) => {
    selectedKeyword.selected = !selectedKeyword.selected;
    setSelectedList(
      keywordData.filter((item: KeywordType) => item.selected)
    );
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
        {selectedList?.map((keyword: KeywordType) => (
          <button
            className={styles.selected}
            key={keyword.id}
            onClick={() => handleSelectPills(keyword)}
          >
            {keyword.title}
          </button>
        ))}

        {keywordData
          .filter((keyword: KeywordType) => !selectedList?.some(selected => selected.id === keyword.id))
          .map((keyword: KeywordType) => (
            <button
              className={styles.keywordPills}
              key={keyword.id}
              onClick={() => handleSelectPills(keyword)}
            >
              {keyword.title}
            </button>
          ))}
      </div>

      {alert && (
        <div className={styles.alertComment}>
          <img src={ico_info} alt="Info Icon" />
          키워드를 해제하면 새로고침을 할 수 있습니다
        </div>
      )}
    </div>
  );
};

export default KeywordList;
