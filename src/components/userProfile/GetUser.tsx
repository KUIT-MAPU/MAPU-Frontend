import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './GetUser.module.scss';
import { ReactComponent as BackArrow } from '../../assets/BackArrow.svg';
import { ReactComponent as FrontArrow } from '../../assets/FrontArrow.svg';
import { ReactComponent as DownArrow } from '../../assets/DownArrow.svg';
import { ReactComponent as Search } from '../../assets/Search.svg';
import { ReactComponent as Gallery } from '../../assets/GalleryView.svg';
import { ReactComponent as List } from '../../assets/ListView.svg';
import {ReactComponent as MiniUser} from '../../assets/ico_miniuser_profile.svg'

import NewMap from './getNewMap/NewMap';

const GetUser = (props: { children?: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('gallery'); //gallery를 기본으로 설정
  const [isNewMapOpen, setIsNewMapOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const placeholderImage = 'https://via.placeholder.com/150';

  const openNewMap = () => {
    setIsNewMapOpen(true);
  };

  const closeNewMap = () => {
    setIsNewMapOpen(false);
  };

  const listMapData = [
    {
      id: 1,
      name: 'Map 1',
      permissions: '편집자',
      participants: 5,
      date: '2024.05.06',
      center: '서울시 광진구',
    },
    {
      id: 2,
      name: 'Map 2',
      permissions: '편집자',
      participants: 4,
      date: '2024.05.06',
      center: '서울시 광진구',
    },
    {
      id: 3,
      name: 'Map 3',
      permissions: '편집자',
      participants: 3,
      date: '2024.05.06',
      center: '서울시 광진구',
    },
    {
      id: 4,
      name: 'Map 4',
      permissions: '편집자',
      participants: 2,
      date: '2024.05.06',
      center: '서울시 광진구',
    },
    {
      id: 5,
      name: 'Map 5',
      permissions: '편집자',
      participants: 1,
      date: '2024.05.06',
      center: '서울시 광진구',
    },
    {
      id: 6,
      name: 'Map 6',
      permissions: '편집자',
      participants: 6,
      date: '2024.05.06',
      center: '서울시 광진구',
    },
    {
      id: 7,
      name: 'Map 7',
      permissions: '편집자',
      participants: 7,
      date: '2024.05.06',
      center: '서울시 광진구',
    },
    {
      id: 8,
      name: 'Map 8',
      permissions: '편집자',
      participants: 7,
      date: '2024.05.06',
      center: '서울시 광진구',
    },
    {
      id: 9,
      name: 'Map 9',
      permissions: '편집자',
      participants: 7,
      date: '2024.05.06',
      center: '서울시 광진구',
    },
    {
      id: 10,
      name: 'Map 10',
      permissions: '편집자',
      participants: 7,
      date: '2024.05.06',
      center: '서울시 광진구',
    },
  ]; //지도 데이터 임시 저장

  const ITEMS_PER_PAGE = 9; //한 페이지에 표시되는 항목 수는 9개
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = listMapData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(10 / ITEMS_PER_PAGE); //10은 가지고 있는 맵의 개수(백과 연동하면 나중에 바꿔야함)

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
      <div className={styles.btnTitle}>
        편집 가능한 지도
        <DownArrow />
      </div>
      <div className={styles.middleBar}>
        <div className={styles.searchBar}>
          <div className={styles.search}>
            <Search />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="검색"
              className={styles.search}
            />
          </div>
        </div>
        <div className={styles.contentView}>
          <button
            onClick={() => setView('gallery')}
            className={view === 'gallery' ? styles.active : ''}
          >
            <Gallery />
          </button>
          <button
            onClick={() => setView('list')}
            className={view === 'list' ? styles.active : ''}
          >
            <List />
          </button>
        </div>
        <div className={styles.newMap} onClick={openNewMap}>
          + 새로운 지도
        </div>
      </div>
      <div className={styles.mapContainer}>
        {view === 'gallery' && (
          <div className={styles.getMap}>
            {currentItems.map((map) => (
              <Link to={`/map/${map.id}`} className={styles.link} key={map.id}>
                <div className={styles.mapWrapper}>
                  <div className={styles.numMap}>
                    <img
                      src={placeholderImage}
                      alt="placeholder"
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.galleryInfo}>
                    <div className={styles.mapTitleLocation}>
                      <div className={styles.mapTitle}>우리 동네 맛집 지도</div>
                      <div className={styles.mapLocation}>성북구 정릉동</div>
                    </div>
                    <MiniUser />
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
              {listMapData.map((map) => (
                <div key={map.id} className={styles.mapList}>
                  <div className={styles.mapListName}>{map.name}</div>
                  <div className={styles.mapListInfo}>
                    <div>{map.permissions}</div>
                    <div>{map.participants}</div>
                    <div>{map.date}</div>
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
