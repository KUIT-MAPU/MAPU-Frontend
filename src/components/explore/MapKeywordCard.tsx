import React, { useEffect, useState } from 'react';
import styles from './MapKeywordCard.module.scss';
import ico_carousel_backward from '../../assets/ico_carousel_backward.svg';
import ico_carousel_forward from '../../assets/ico_carousel_forward.svg';
import { getKeywordMap } from '../../apis/keywords/getKeywordMap';
import { KeywordMapType } from '../../types/keywords/KeywordMapType';
import { Link } from 'react-router-dom';

interface MapKeywordCardProps {
  keyword: string;
  mapId: number;
  isSelect: boolean;
}

const MapKeywordCard: React.FC<MapKeywordCardProps> = ({
  keyword,
  isSelect,
  mapId,
}) => {
  const INIT_RENDER = 4;
  const MAP_PER_PAGE = 3;
  const [renderKeyword, setRenderKeyword] = useState(INIT_RENDER);
  const [keywordMap, setKeywordMap] = useState<KeywordMapType | undefined>(
    undefined,
  );

  const handleForward = () => {
    setRenderKeyword((prev) => prev - MAP_PER_PAGE);
  };

  const handleBackward = () => {
    setRenderKeyword((prev) => prev + MAP_PER_PAGE);
  };

  const fetchKeywordMap = async () => {
    const result = await getKeywordMap(keyword);
    if (result && result.length > 0) {
      setKeywordMap(result[0]);
    }
  };

  useEffect(() => {
    if (keyword) {
      fetchKeywordMap();
    }
  }, [keyword]);

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
          className={`${!keywordMap || renderKeyword <= INIT_RENDER ? styles.hidden : styles.backward}`}
          onClick={handleBackward}
        >
          <img src={ico_carousel_backward} alt="Backward" />
        </button>
      </div>
      {isSelect &&
        mapId &&
        keywordMap?.maps
          .slice(renderKeyword - INIT_RENDER, renderKeyword)
          .map((map, index) => (
            <div key={index} className={styles.keywordItem}>
              <Link to={`/map/${map.mapId}/view`}>
                <img src={map.mapImage} className={styles.keywordImg} />
              </Link>
              <div className={styles.keywordInfo}>
                <span className={styles.keywordTitle}>{map.mapTitle}</span>
              </div>
            </div>
          ))}
    </div>
  );
};

export default MapKeywordCard;
