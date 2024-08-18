import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import SideBar from '../../components/global/GlobalNavigationBar';
import HeaderNavigation from '../../components/timeLine/headerNavigation/HeaderNavigation';
import LeftBar from '../../components/timeLine/leftBar/LeftBar';
import SearchBar from '../../components/explore/SearchBar';
import SearchPopUp from '../../components/explore/SearchPopUp';
import useRegisterStore from '../../stores/registerStore';
import { getExploreMap } from '../../apis/mapData/getExploreMap';
import MapList from '../../components/explore/MapList';
import ErrorPage from '../../components/explore/ErrorPage';
import { useAllKeywordStore, useKeywordStore } from '../../stores/keywordStore';

import styles from './Explore.module.scss';

import ico_title_arrow_down from '../../assets/ico_title_arrow_down.svg';
import { KeywordType } from '../../types/keywords/KeywordType';
import { KeywordMapType } from '../../types/keywords/KeywordMapType';
import { getKeywordMap } from '../../apis/keywords/getKeywordMap';
import { APIKeywordMapType } from '../../types/keywords/APIKeywordMapType';
import { ExploreMapType } from '../../types/mapData/ExploreMapType';
import { getSearchMap } from '../../apis/mapData/getSearchMap';

const Explore: React.FC = () => {
  const outside = useRef<HTMLDivElement>(null);
  const mainRef = useRef(null)
  const token = useRegisterStore((state) => state.accessToken);
  const [isCheck, setIsCheck] = useState<string>('random');
  const [text, setText] = useState<string>('');
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [mapData, setMapData] = useState<ExploreMapType[]>([]);
  const [searchData, setSearchData] = useState<ExploreMapType[]>([]);
  const { ref, inView } = useInView({
    threshold: 0.1,
    root: mainRef.current,
  });
  const [page, setPage] = useState<number>(0);
  const [isLog, setIsLog] = useState<boolean>(false);
  const [keywordMap, setKeywordMap] = useState<KeywordMapType[] | undefined>(
    undefined,
  );
  const { allKeywordList, setAllKeywordList } = useAllKeywordStore();
  const { selectedList, setSelectedList } = useKeywordStore();

  const fetchLoad = async () => {
    const newMaps = await getExploreMap(isCheck, 4, page);
    if (newMaps !== undefined) {
      setMapData((pre) => [...pre, ...newMaps]);
    }
  };

  const fetchSearch = async () => {
    const newMaps = await getSearchMap(isCheck, text, 4, page);
    if (newMaps !== undefined) {
      setSearchData((pre) => [...pre, ...newMaps]);
    }
  };

  const fetchKeywordMap = async () => {
    if (selectedList.length !== 0) {
      const keyword = selectedList[0].title;
      setText(keyword);
      const result = await getKeywordMap(keyword);

      if (result) {
        const newResults: KeywordMapType[] = result.map(
          (map: APIKeywordMapType) => {
            const newKeyword: KeywordType = {
              id: Math.random(),
              title: map.keyword,
              selected: false,
            };

            return {
              ...map,
              keyword: newKeyword,
            };
          },
        );
        setKeywordMap(newResults);
      }
    }
  };

  const handleRandomBtn = () => {
    setIsCheck('random');
  };

  const handleRecentBtn = () => {
    setIsCheck('date');
  };

  const handleMenuBtn = () => {
    setIsPopup(!isPopup);
  };

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `탐색 | MAPU`;
  }, []);

  useEffect(() => {
    if (token) {
      setIsLog(true);
    } else {
      setIsLog(false);
    }
  }, [token]);

  useEffect(() => {
    if (text !== '' && selectedList.length === 0) {
      setPage(0);
      setSearchData([]);
      fetchSearch(); // 지도 제목 검색
    } else if (text === '' && selectedList.length === 0) {
      setPage(0);
      setMapData([]);
      fetchLoad();
    } else if (selectedList.length !== 0) {
      setPage(0);
      setKeywordMap(undefined);

      fetchKeywordMap();
    }
  }, [text,isCheck,selectedList]);

  useEffect(() => {
    if(selectedList.length === 0 ) {
      setText('')
    }
  },[selectedList])

  useEffect(() => {
    if (inView) {
      setPage((num) => num + 1);
      fetchLoad()
    }
  }, [inView]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (outside.current && !outside.current.contains(event.target as Node)) {
        setIsPopup(false);
      }
    };

    if (isPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopup]);

  useEffect(() => {
    setSelectedList([]);
    if (allKeywordList) {
      const keywords: KeywordType[] = allKeywordList.map((item) => {
        return { ...item, selected: false };
      });
      setAllKeywordList(keywords);
    }
  }, []);

  let content;

  if (text.length === 0 && selectedList.length === 0) {
    content = (
      <div className={styles.map}>
        {mapData && mapData.length !== 0 ? (
          mapData.map((item, index) => (
            <div className={styles.mapListMain} key={index}>
              <MapList map={item} keyword={item.keyword} />
            </div>
          ))
        ) : (
          <ErrorPage text={text} />
        )}
        <div ref={ref}/>
      </div> //  랜덤순/ 날짜순
    );
  } else if (text.length > 0 && selectedList.length === 0) {
    content = (
      <div className={styles.map}>
        {searchData && searchData.length !== 0 ? (
          searchData.map((item, index) => (
            <div className={styles.mapListMain} key={index}>
              <MapList map={item} keyword={item.keyword} />
            </div>
          ))
        ) : (
          <ErrorPage text={text} />
        )}
        <div ref={ref}/>
      </div> // 지도 제목 검색
    );
  } else if (selectedList.length !== 0) {
    content = (
      <div className={styles.map}>
        {keywordMap?.map((item: KeywordMapType, index) => {
          if (item.maps.length === 0) {
            return <ErrorPage text={item.keyword.title} />;
          } else {
            return (
              <div className={styles.mapListMain} key={`map-${index}`}>
                <MapList keywordMap={item.maps} keyword={item.keyword} />
              </div>
            );
          }
        })}
        <div ref={ref}/>
      </div> // 키워드 검색
    );
  }


  return (
    <div className={styles.root}>
      <SideBar />
      <div className={styles.leftBarWrapper}>
        <LeftBar token={token} isLog={isLog} />
        <div className={styles.pageMain}>
          <HeaderNavigation />
          <div className={styles.mapMain}>
            <div className={styles.btnTitle}>
              {isCheck === 'random' && (
                <span className={styles.title}>랜덤순 탐색</span>
              )}
              {isCheck === 'date' && (
                <span className={styles.title}>날짜순 탐색</span>
              )}
              <button className={styles.btnArrow} onClick={handleMenuBtn}>
                <img src={ico_title_arrow_down} alt="Arrow Down Icon" />
              </button>
              {isPopup && (
                <div ref={outside}>
                  <SearchPopUp
                    className={styles.searchModule}
                    isCheck={isCheck}
                    handleRandomBtn={handleRandomBtn}
                    handleRecentBtn={handleRecentBtn}
                  />
                </div>
              )}
            </div>
            <SearchBar
              className={styles.searchBar}
              text={text}
              setText={setText}
            />
            <div className={styles.main} ref={mainRef}>
              {content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
