import React, { useState } from 'react';
import styles from './MapKeywordCard.module.scss';
import { MapKeywordType } from '../../types/MapKeywordType';
import ico_carousel_backward from '../../assets/ico_carousel_backward.svg';
import ico_carousel_forward from '../../assets/ico_carousel_forward.svg';

interface MapKeywordCardProps {
  isSelect: boolean;
  keyword: MapKeywordType;
}

const MapKeywordCard: React.FC<MapKeywordCardProps> = ({
  isSelect,
  keyword,
}) => {
  const INIT_RENDER: number = 4;
  const MAP_PER_PAGE: number = 3;
  const [renderKeyword, setRenderKeyword] = useState<number>(INIT_RENDER);

  const handleForward = () => {
    setRenderKeyword((preVisibleItems) => preVisibleItems - MAP_PER_PAGE);
    console.log('forward:', renderKeyword);
  };

  const handleBackward = () => {
    setRenderKeyword((prevVisibleItems) => prevVisibleItems + MAP_PER_PAGE);
    console.log('backward:', renderKeyword);
    console.log('keyword.keyword.length:', Object.entries(keyword.img).length);
  };

  return (
    <div className={styles.keywordRoot}>
      <div className={styles.buttonContainer}>
        <button
          className={`${renderKeyword > INIT_RENDER ? styles.forward : styles.hidden}`}
          onClick={handleForward}
        >
          <img src={ico_carousel_forward} alt="Forward" />
        </button>

        <button
          className={`${renderKeyword > Object.entries(keyword.img).length ? styles.hidden : styles.backward}`}
          onClick={handleBackward}
        >
          <img src={ico_carousel_backward} alt="Backward" />
        </button>
      </div>
      {isSelect &&
        Object.entries(keyword.img)
          .slice(renderKeyword - INIT_RENDER, renderKeyword)
          .map(([title, img], index) => (
            <div key={index} className={styles.keywordItem}>
              <img src={img} alt={title} className={styles.keywordImg} />
              <div className={styles.keywordInfo}>
                <span className={styles.keywordTitle}>{title}</span>
              </div>
            </div>
          ))}
    </div>
  );
};

export default MapKeywordCard;
