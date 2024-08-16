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
import mockData from '../../components/timeLine/mapCard/MapModel';

import styles from './Explore.module.scss';

import ico_title_arrow_down from '../../assets/ico_title_arrow_down.svg';
import { MapType } from '../../types/MapType';
import { KeywordType } from '../../types/keywords/KeywordType';
import { useQuery } from 'react-query';
import { KeywordMapType } from '../../types/keywords/KeywordMapType';
import { getKeywordMap } from '../../apis/keywords/getKeywordMap';
import { APIKeywordMapType } from '../../types/keywords/APIKeywordMapType';

const Explore: React.FC = () => {
  const token = useRegisterStore((state) => state.accessToken);
  const [isCheck, setIsCheck] = useState<string>('random');
  const [text, setText] = useState<string>('');
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [mapData, setMapData] = useState<MapType[]>([]);
  const [ref, inView] = useInView();
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(4);
  const [isLog, setIsLog] = useState<boolean>(false);
  const [keywordMap, setKeywordMap] = useState<KeywordMapType[] | undefined>(
    undefined,
  );

  const { selectedList, setSelectedList } = useKeywordStore();

  const outside = useRef<HTMLDivElement>(null);

  const { allKeywordList, setAllKeywordList } = useAllKeywordStore();

  const { data: ExploreMapData, refetch } = useQuery(
    ['exploreMapData', isCheck, size, page],
    () => getExploreMap(text, size, page),
  );

  const fetchKeywordSearch = async (keyword: KeywordType) => {
    try {
      //TODO: API
      const data = mockData.filter((map) => map.keywords === keyword.title);
      setMapData(data);
    } catch {
      console.error('error');
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
    if (inView) {
      setPage((num) => num + 1);
    }
  }, [page]);

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

  useEffect(() => {
    const fetchData = async () => {
      if (selectedList !== null && selectedList.length !== 0) {
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
      } else {
        setText('');
        setKeywordMap(undefined);
      }
    };

    fetchData();
  }, [selectedList]);

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
            <div className={styles.main} ref={ref}>
              {ExploreMapData !== undefined && selectedList.length === 0 ? (
                ExploreMapData.map((item, index) => (
                  <div key={item.mapId} ref={index === 3 ? ref : null}>
                    <MapList
                      map={item}
                      key={item.mapId}
                      keyword={item.keyword}
                    />
                  </div>
                ))
              ) : (
                <ErrorPage text={text} />
              )}

              {selectedList.length !== 0 && keywordMap !== undefined ? (
                keywordMap.map((map: KeywordMapType) => {
                  const keyword = map.keyword;
                  const data = map.maps;
                  return <MapList keyword={keyword} keywordMap={data} />;
                })
              ) : (
                <ErrorPage text={text} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
