import React from 'react';

import { MapType } from '../../types/MapType';
import userImg from '../../assets/user.svg';

import styles from './MapList.module.scss';

interface MapListProps {
  map: MapType;
}
const MapList: React.FC<MapListProps> = ({ map }) => {
  return (
    <div className={styles.MapListRoot}>
      <div className={styles.Images}>
        <img src={map.img} className={styles.mapImg} />

        <div className={styles.editor}>
          {/* {map.editors.map((editor, index) => {
            const offset = index * 15;
            return (
              <div className={styles.editor}>
                <img
                  key={index}
                  src={userImg}
                  alt={`${editor.name} editor`}
                  style={{ right: `${offset}px`, top: '0px' }}
                /> 
                <div className={styles.editorInfo}>
                  <img src={map.owner?.img} />
                  <span className={styles.editorName}>{map.owner?.name}</span>
                  <span className={styles.editorId}>{map.owner?.userId}</span>
                </div>
              </div>
            );
          })} */}
          <img src={userImg} />

          <div className={styles.editorInfo}>
            <span className={styles.editorName}>{map.owner?.name}</span>
            <span className={styles.editorId}>{map.owner?.userId}</span>
          </div>
        </div>
      </div>

      <div className={styles.mapInfo}>
        <div className={styles.mapContent}>
          <div className={styles.mapTitle}>
            <span className={styles.mapName}>{map.name}</span>
            <span className={styles.mapAddress}>{map.address}</span>
          </div>

          <span className={styles.description}>{map.discription}</span>
        </div>

        <div className={styles.mapKeyword}>
          {map.mapKeyword?.map((keyword: string,index: number) => (
            <button
              className={styles.keywordPills}
              key={index}
              // onClick={() => handleSelectPills(keyword)}
            >
              {keyword}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapList;
