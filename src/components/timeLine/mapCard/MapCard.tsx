import React, { useEffect, useState } from 'react';

import styles from './MapCard.module.scss';

import user_default from '../../../assets/img_user_default_profile.svg';
import ico_carousel_backward from '../../../assets/ico_carousel_backward.svg';
import ico_carousel_forward from '../../../assets/ico_carousel_forward.svg';
import { Link } from 'react-router-dom';
import { MapsType } from '../../../types/mapData/MapsType';
import { MapsType  as keywordMapsType} from '../../../types/keywords/MapsType';
import { FollowingMapType } from '../../../types/mapData/FollowingMapType';

interface MapCardProps {
  mapData?: keywordMapsType[];
  keyword: string;
  followingMap?: MapsType[];
  userInfo?: FollowingMapType;
}

const MapCard: React.FC<MapCardProps> = ({
  mapData,
  keyword,
  userInfo,
  followingMap,
}) => {
  const INIT_RENDER: number = 3;
  const MAP_PER_PAGE: number = 2;
  const [renderMap, setRenderMap] = useState<number>(INIT_RENDER);

  useEffect(() => {
    console.log('MapCard followingMap:', followingMap);
  }, [followingMap]);
  const handleForward = () => {
    setRenderMap((preVisibleItems) => preVisibleItems - MAP_PER_PAGE);
  };

  const handleBackward = () => {
    setRenderMap((prevVisibleItems) => prevVisibleItems + MAP_PER_PAGE);
  };

  return (
    <div className={styles.mapcard}>
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
            className={`${renderMap > (followingMap?.length ?? 0) ? styles.hidden : styles.backward}`}
            onClick={handleBackward}
          >
            <img src={ico_carousel_backward} alt="Backward" />
          </button>
        </div>
        {followingMap
          ?.slice(renderMap - INIT_RENDER, renderMap)
          .map((map, index) => (
            <Link
              to={`/map/${map.title}/view`}
              style={{ textDecoration: 'none' }}
            >
              <div key={index} className={styles.map}>
                <img
                  src={map.imageUrl}
                  className={styles.mapImg}
                  alt={`${map.title}`}
                />

                <div className={styles.info}>
                  <div className={styles.mapInfo}>
                    <div className={styles.title}>{map.title}</div>
                    <div className={styles.address}>{map.address}</div>
                  </div>

                  <div className={styles.editorImg}>
                    <img
                      key={index}
                      src={
                        userInfo?.userImages
                          ? userInfo.userImages
                          : user_default
                      }
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}

        {mapData?.slice(renderMap - INIT_RENDER, renderMap).map((map) => (
          <Link to={`/map/${map.mapTitle}/view`} style={{ textDecoration: 'none' }}>
            <div key={Math.random()} className={styles.map}>
              <img
                src={map.mapImage}
                className={styles.mapImg}
              />

              <div className={styles.info}>
                <div className={styles.mapInfo}>
                  <div className={styles.title}>{map.mapTitle}</div>
                  {/* <div className={styles.address}>{map.address}</div> */}
                </div>

                <div className={styles.editorImg}>
                      <img
                        key={Math.random()}
                        src={map.userImage ? map.userImage : user_default}
                      />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MapCard;
