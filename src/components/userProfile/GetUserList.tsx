import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './GetUser.module.scss';
import { ReactComponent as BackArrow } from '../../assets/BackArrow.svg';
import { ReactComponent as FrontArrow } from '../../assets/FrontArrow.svg';
import { ReactComponent as DownArrow } from '../../assets/DownArrow.svg';
import { ReactComponent as Search } from '../../assets/Search.svg';
import { ReactComponent as Gallery } from '../../assets/GalleryView.svg';
import { ReactComponent as List } from '../../assets/ListView.svg';

const GetUser = (props: { children?: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');

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
          <Gallery />
          <List />
        </div>
        <div className={styles.newMap}>+ 새로운 지도</div>
      </div>
    </div>
  );
};
