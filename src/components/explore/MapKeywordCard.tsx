import React, { useEffect, useState } from 'react';
import styles from './MapKeywordCard.module.scss';
import ico_carousel_backward from '../../assets/ico_carousel_backward.svg';
import ico_carousel_forward from '../../assets/ico_carousel_forward.svg';
import { getKeywordMap } from '../../apis/keywords/getKeywordMap';
import { KeywordMapType } from '../../types/keywords/KeywordMapType';
import { APIKeywordMapType } from '../../types/keywords/APIKeywordMapType';
import { KeywordType } from '../../types/keywords/KeywordType';

interface MapKeywordCardProps {
  keyword: string;
}

const MapKeywordCard: React.FC<MapKeywordCardProps> = ({
  keyword,
}) => {
  const INIT_RENDER: number = 4;
  const MAP_PER_PAGE: number = 3;
  const [renderKeyword, setRenderKeyword] = useState<number>(INIT_RENDER);
  const [keywordMap, setKeywordMap] = useState<KeywordMapType | undefined>(
    undefined,
  );

  const handleForward = () => {
    setRenderKeyword((preVisibleItems) => preVisibleItems - MAP_PER_PAGE);
    console.log('forward:', renderKeyword);
  };

  const handleBackward = () => {
    setRenderKeyword((prevVisibleItems) => prevVisibleItems + MAP_PER_PAGE);
  };

  const fetchKeywordMap = async () => {
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
        setKeywordMap(newResults[0]);
      }
  };

  useEffect(() => {
    if(keyword) {
      fetchKeywordMap()
    }
  },[keyword])

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
          className={`${keywordMap !== undefined && renderKeyword > keywordMap.maps.length ? styles.hidden : styles.backward}`}
          onClick={handleBackward}
        >
          <img src={ico_carousel_backward} alt="Backward" />
        </button>
      </div>
      {
        keywordMap?.maps
          .slice(renderKeyword - INIT_RENDER, renderKeyword)
          .map((map, index) => (
            <div key={index} className={styles.keywordItem}>
              <img src={map.mapImage} className={styles.keywordImg} />
              <div className={styles.keywordInfo}>
                <span className={styles.keywordTitle}>{map.mapTitle}</span>
              </div>
            </div>
          ))}
    </div>
  );
};

export default MapKeywordCard;
