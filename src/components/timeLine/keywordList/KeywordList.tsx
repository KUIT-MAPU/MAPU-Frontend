import React, { useEffect, useState } from 'react';
import styles from './KeywordList.module.scss';
import { KeywordType } from '../../../types/KeywordType';
import ico_info from '../../../assets/ico_info.svg';
//keywordodata types 폴더에서 import

interface KeywordListProps {
  className?: string;
}

const mockData: KeywordType[] = [
  { id: 1, title: '동대문시장 골목맛집', selected: false },
  { id: 2, title: '서울 타워 야경 관람', selected: false },
  { id: 3, title: '홍대 놀이터 스트리트 퍼포먼스', selected: false },
  { id: 4, title: '강남역 카페 투어', selected: false },
  { id: 5, title: '코엑스 쇼핑몰 쇼핑 추천', selected: false },
  // { id: 6, title: '북촌 한옥마을 전통 찻집', selected: false },
  // { id: 7, title: '경복궁 역사적 관광지', selected: false },
  // { id: 8, title: '인사동 미술 갤러리 투어', selected: false },
  // { id: 9, title: '이태원 길거리 음식점 탐방', selected: false },
  // { id: 10, title: '한강공원 자전거 타기', selected: false }
];


const KeywordList: React.FC<KeywordListProps> = ({ className }) => {
  const [keywordData, setKeywordData] = useState<KeywordType[]>([]); // any => keyword[]
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<KeywordType[]>([]);
  const [alert, setAlert] =  useState<boolean>(false);

  const fetchKeywordData = async () => {
    try {
      //api data
      setKeywordData(mockData);
    } catch (error){
      console.error('정보를 불러올 수 없음.');
    }
  }

  useEffect(() => {
    fetchKeywordData();
  },[]);

  useEffect(()=> {
    if(isRefresh) {
      fetchKeywordData();//새로운 KeywordData 받아옴 
      setKeywordData(prevKeywordData =>
        prevKeywordData.filter((item: KeywordType) => !isSelected.includes(item))
      );
      setIsRefresh(false);
      console.log('새로고침 누름',isRefresh);

      if(isSelected.length === 5) {
        setAlert(true)
      }
    }
    console.log('isRefresh',isRefresh);
  },[isRefresh])



  const handleRefreshClick = () => {
    setIsRefresh(true);
  }

  const handleSelectPills = (selectedKeyword: KeywordType) => {
    const selectedId = selectedKeyword.id;
    selectedKeyword.selected = !selectedKeyword.selected;
    
    setIsSelected(
      keywordData.filter((item: KeywordType) => item.selected)
    );
  };

  console.log('전체 키워드 데이터:', keywordData);
  console.log('선택된 키워드:',isSelected);
  console.log('새로고침한 키워드:',keywordData);

  return (
    <div className={className}>
      <div className={styles.titleBar}>
        <div className={styles.title}>추천 키워드</div>
        <button className={styles.refreshBtn} onClick={handleRefreshClick}>
          <span className={styles.refreshBtnContent}>새로고침</span>
        </button>
      </div>

        <div className={styles.keywords}>
          {isSelected.map((keyword : KeywordType) => (
            <button className={styles.selected} key={keyword.id} onClick={() => handleSelectPills(keyword)}>
              {keyword.title}
            </button>
          ))}

          {keywordData
          .filter((keyword:KeywordType) => !isSelected.some(selected => selected.id === keyword.id))
          .map((keyword:KeywordType) => (
            <button className={styles.keywordPills} key={keyword.id} onClick={()=>handleSelectPills(keyword)}>
              {keyword.title}
            </button>
          ))}
        </div>

        {alert && (
          <div className={styles.alertComment}>
            <img src={ico_info} />
            키워드를 해제하면 새로고침을 할 수 있습니다
          </div>
        )}
  </div>
)}

export default KeywordList;
