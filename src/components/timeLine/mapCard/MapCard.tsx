import React, { useEffect, useState } from 'react';

import { MapType } from '../../../types/MapType';

import styles from './MapCard.module.scss';

import userImg from '../../../assets/user.svg';
import ico_carousel_backward from '../../../assets/ico_carousel_backward.svg';
import ico_carousel_forward from '../../../assets/ico_carousel_forward.svg';
import { Link } from 'react-router-dom';

interface MapCardProps {
  mapData: MapType[];
  isLog: Boolean;
  keyword: string;
}

const MapCard: React.FC<MapCardProps> = ({ mapData, isLog, keyword }) => {
  const INIT_RENDER: number = 3;
  const MAP_PER_PAGE: number = 2;
  const [renderMap, setRenderMap] = useState<number>(INIT_RENDER);

  const handleForward = () => {
    setRenderMap((preVisibleItems) => preVisibleItems - MAP_PER_PAGE);
  };

  const handleBackward = () => {
    setRenderMap((prevVisibleItems) => prevVisibleItems + MAP_PER_PAGE);
  };

  return (
    <div className={styles.mapcard}>
      <div className={styles.wrapper}>
        <div className={styles.keyword}>{keyword}</div>

        <div className={styles.mapContainer}>
          <div className={styles.buttonContainer}>
            <button
              className={`${renderMap > INIT_RENDER ? styles.forward : styles.hidden}`}
              onClick={handleForward}
            >
              <img src={ico_carousel_forward} alt="Forward" />
            </button>

            <button
              className={`${renderMap > mapData.length ? styles.hidden : styles.backward}`}
              onClick={handleBackward}
            >
              <img src={ico_carousel_backward} alt="Backward" />
            </button>
          </div>
          {mapData.slice(renderMap - INIT_RENDER, renderMap).map((map) => (
            <Link to={`/map/${map.name}/view`}  style={{ textDecoration: "none"}}>
            
            <div key={map.id} className={styles.map}>
              <img
                src={map.img}
                className={styles.mapImg}
                alt={`${map.name}`}
              />

              <div className={styles.info}>
                <div className={styles.mapInfo}>
                  <div className={styles.title}>{map.name}</div>
                  <div className={styles.address}>{map.address}</div>
                </div>

                <div className={styles.editorImg}>
                  {map.editors.map((editor, index) => {
                    const offset = index * 15;
                    return (
                      <img
                        key={index}
                        src={userImg}
                        alt={`${editor.name} editor`}
                        style={{ right: `${offset}px`, top: '0px' }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapCard;
