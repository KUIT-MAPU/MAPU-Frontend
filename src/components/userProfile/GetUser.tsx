import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Navigate } from 'react-router-dom';

import styles from './GetUser.module.scss';
import { ReactComponent as BackArrow } from '../../assets/BackArrow.svg';
import { ReactComponent as FrontArrow } from '../../assets/FrontArrow.svg';
import { ReactComponent as DownArrow } from '../../assets/DownArrow.svg';
import { ReactComponent as Search } from '../../assets/Search.svg';
import { ReactComponent as Gallery } from '../../assets/GalleryView.svg';
import { ReactComponent as List } from '../../assets/ListView.svg';
import { ReactComponent as ExampleUser } from '../../assets/ico_exampleuser_profile.svg';
import { ReactComponent as CreatMap } from '../../assets/btn_map_create.svg';

import useRegisterStore from '../../stores/registerStore';
import { RegisterStatus } from '../../types/enum/RegisterStatus';

import instance from '../../apis/instance';
import NewMap from './getNewMap/NewMap';

const GetUser = (props: { children?: React.ReactNode }) => {
  const navigate=useNavigate();
  const [view, setView] = useState('gallery'); //gallery를 기본으로 설정
  const [isNewMapOpen, setIsNewMapOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [mapTitle, setMapTitle] = useState<string>('');
  const [mapCategory, setMapCategory] = useState<string>('edited');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [mapData, setMapData] = useState([]);
  const [searchInput,setSearchInput] = useState<string>('');

  const openNewMap = () => {
    setIsNewMapOpen(true);
  };

  const closeNewMap = () => {
    setIsNewMapOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectCategory = (category: string) => {
    setMapCategory(category);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let response;
        if(mapCategory==='edited'){
          response = await instance.get(`/user/maps?editable=true&bookmarked=false`);
        }else{
          response = await instance.get(`/user/maps?editable=false&bookmarked=true`);
        }
        const data = response.data;
  
        if (Array.isArray(data.result)) {
          setMapData(data.result); // result 배열을 mapData로 설정
        } else {
          console.error('Fetched data is not an array:', data.result);
        }
      } catch (error) {
        console.error('Failed to fetch map data', error);
      }
    };

    fetchUserData();
  }, [mapCategory]);
  
  const filteredMaps=mapData.filter((map:any) =>
    typeof map.title === 'string' && 
    map.title.toLowerCase().includes(mapTitle.toLowerCase())
  );

  const ITEMS_PER_PAGE = 9; //한 페이지에 표시되는 항목 수는 9개
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

  const currentItems = mapTitle
  ? filteredMaps.slice(indexOfFirstItem, indexOfLastItem) // 검색 결과를 표시
  : mapData.slice(indexOfFirstItem, indexOfLastItem); // 모든 맵을 표시

  const totalPages = mapTitle
  ? Math.ceil(filteredMaps.length / ITEMS_PER_PAGE) // 검색 결과에 대한 페이지 수
  : Math.ceil(mapData.length / ITEMS_PER_PAGE); // 전체 맵에 대한 페이지 수

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.iconContainer}>
          <div className={styles.square} onClick={() => window.history.back()}>
            <BackArrow />
          </div>
          <div
            className={styles.square}
            onClick={() => window.history.forward()}
          >
            <FrontArrow />
          </div>
        </div>
      </div>
      <button className={styles.btnTitle} onClick={toggleDropdown}>
        {mapCategory === 'edited' ? '편집 가능한 지도' : '북마크한 지도'}
        <DownArrow />
      </button>
      {isDropdownOpen && (
        <div className={styles.dropdown}>
          <div
            onClick={() => selectCategory('edited')}
            className={styles.dropdownItem}
          >
            편집 가능한 지도
          </div>
          <div
            onClick={() => selectCategory('bookmarked')}
            className={styles.dropdownItem}
          >
            북마크한 지도
          </div>
        </div>
      )}
      <div className={styles.middleBar}>
        <div className={styles.searchBar}>
          <div className={styles.search}>
            <Search />
            <input
              type="text"
              className={styles.searchInput}
              value={mapTitle}
              onChange={(e) => {
                setMapTitle(e.target.value);
                setCurrentPage(1); 
              }}
              placeholder="검색"
            />
          </div>
        </div>
        <div className={styles.contentView}>
          <button
            onClick={() => setView('gallery')}
            className={`${styles.iconButton} ${view === 'gallery' ? styles.activeView : ''}`}
          >
            <Gallery />
          </button>
          <button
            onClick={() => setView('list')}
            className={`${styles.iconButton} ${view === 'list' ? styles.activeView : ''}`}
          >
            <List />
          </button>
        </div>
        <div className={styles.newMap} onClick={openNewMap}>
          <CreatMap />
        </div>
      </div>
      <div className={styles.mapContainer}>
        {view === 'gallery' && (
          <div className={styles.getMap}>
            {currentItems.map((map :any) => (
              <Link to={`/map/${map.id}`} className={styles.link} key={map.id}>
                <div className={styles.mapWrapper}>
                  <div className={styles.numMap}>
                    <img
                      src={map.imageUrl}
                      alt="mapImage"
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.galleryInfo}>
                    <div className={styles.mapTitleLocation}>
                      <div className={styles.mapTitle}>{map.title}</div>
                      <div className={styles.mapLocation}>{map.region}</div>
                    </div>
                    <ExampleUser />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        {view === 'list' && (
          <div>
            <div className={styles.listInfo}>
              <div className={styles.mapName}>지도 이름</div>
              <div className={styles.mapInfo}>
                <div>권한</div>
                <div>참여자</div>
                <div>제작한 날짜</div>
                <div>중앙 위치</div>
              </div>
            </div>
            <div className={styles.listContainer}>
              {currentItems.map((map:any) => (
                <div key={map.id} className={styles.mapList}>
                  <div className={styles.mapListName}>
                    <div className={styles.mapListImage}>
                      <img
                        src={map.imageUrl}
                        alt="mapImage"
                        className={styles.image}
                      />
                    </div>
                    <div className={styles.mapListImageTitleLocation}>
                      <div className={styles.mapListImageTitle}>
                        {map.title}
                      </div>
                      <div className={styles.mapListImageLocation}>
                        {map.region}
                      </div>
                    </div>
                  </div>
                  <div className={styles.mapListInfo}>
                    <div>{map.role}</div>
                    <div>
                      <ExampleUser />
                    </div>
                    <div>{map.createdDate}</div>
                    <div>{map.center}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {view === 'gallery' && (
          <div className={styles.pagination}>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              이전
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              다음
            </button>
          </div>
        )}
      </div>
      {isNewMapOpen && <NewMap onClose={closeNewMap} />}
    </div>
  );
};

export default GetUser;
