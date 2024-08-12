import React, { useState, useEffect } from 'react';
import styles from './EmptyUser.module.scss';
import { ReactComponent as BackArrow } from '../../assets/BackArrow.svg';
import { ReactComponent as FrontArrow } from '../../assets/FrontArrow.svg';
import { ReactComponent as DownArrow } from '../../assets/DownArrow.svg';
import { ReactComponent as Search } from '../../assets/Search.svg';
import { ReactComponent as Gallery } from '../../assets/GalleryView.svg';
import { ReactComponent as List } from '../../assets/ListView.svg';
import {ReactComponent as CreatMap} from '../../assets/btn_map_create.svg';


const EmptyUser = (props: { children?: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.iconContainer}>
          <div className={styles.square}>
            <BackArrow />
          </div>
          <div className={styles.square}>
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
            검색
          </div>
        </div>
        <div className={styles.contentView}>
          <Gallery />
          <List />
        </div>
        <div className={styles.newMap}><CreatMap /></div>
      </div>
      <div className={styles.emptyAlert}>
        <div>지도 파일이 없습니다</div>
        <div>새로운 지도를 생성해보세요</div>
      </div>
    </div>
  );
};

export default EmptyUser;
