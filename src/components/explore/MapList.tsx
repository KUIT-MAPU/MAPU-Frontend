import { MapType } from '../../types/MapType';
import userImg from '../../assets/user.svg';

import styles from './MapList.module.scss';
import { MapKeywordType } from '../../types/MapKeywordType';
import MapKeywordCard from './MapKeywordCard';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface MapListProps {
  map: MapType;
  keyword: MapKeywordType[];
}

const MapList: React.FC<MapListProps> = ({ map, keyword }) => {
  const [selectedKeyword, setSelectedKeyword] = useState<MapKeywordType | null>(
    null,
  );

  const handleSelectPills = (mapKeyword: MapKeywordType) => {
    if (selectedKeyword?.keyword === mapKeyword.keyword) {
      setSelectedKeyword(null);
    } else {
      setSelectedKeyword(mapKeyword);
    }
  };

  return (
    <div className={styles.MapListRoot}>
      <div className={styles.Images}>
        <Link to={`/map/${map.name}/view`} style={{ textDecoration: 'none' }}>
          <img src={map.img} className={styles.mapImg} alt="Map" />
        </Link>

        <div className={styles.editor}>
          <img src={userImg} alt="User" />
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
          {keyword?.map((mapKeyword: MapKeywordType, index: number) => (
            <button
              className={
                selectedKeyword?.keyword === mapKeyword.keyword
                  ? styles.selected
                  : styles.keywordPills
              }
              key={index}
              onClick={() => handleSelectPills(mapKeyword)}
            >
              {mapKeyword.keyword}
            </button>
          ))}
        </div>

        <div className={styles.keywordContainer}>
          {selectedKeyword && (
            <MapKeywordCard
              isSelect={!!selectedKeyword}
              keyword={selectedKeyword}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MapList;
