import { MapType } from '../../types/MapType';
import userImg from '../../assets/user.svg';

import styles from './MapList.module.scss';
import { MapKeywordType } from '../../types/MapKeywordType';
import MapKeywordCard from './MapKeywordCard';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExploreMapType } from '../../types/mapData/ExploreMapType';
import { KeywordType } from '../../types/keywords/KeywordType';

interface MapListProps {
  map: ExploreMapType;
  keyword: KeywordType[];
}

const MapList: React.FC<MapListProps> = ({ map, keyword }) => {
  const [selectedKeyword, setSelectedKeyword] = useState<string>('');

  const handleSelectPills = (mapKeyword: KeywordType) => {
    if (selectedKeyword === mapKeyword.title) {
      setSelectedKeyword('');
    } else {
      setSelectedKeyword(mapKeyword.title);
    }
  };

  return (
    <div className={styles.MapListRoot}>
      <div className={styles.Images}>
        <Link to={`/map/${map.title}/view`} style={{ textDecoration: 'none' }}>
          <img src={map.imageUrl} className={styles.mapImg} alt="Map" />
        </Link>

        <div className={styles.editor}>
          <img src={userImg} alt="User" />
          <div className={styles.editorInfo}>
            <span className={styles.editorName}>{map.user.nickName}</span>
            <span className={styles.editorId}>{map.user.imageUrl}</span>
          </div>
        </div>
      </div>

      <div className={styles.mapInfo}>
        <div className={styles.mapContent}>
          <div className={styles.mapTitle}>
            <span className={styles.mapName}>{map.title}</span>
            <span className={styles.mapAddress}>{map.region}</span>
          </div>
          <span className={styles.description}>{map.description}</span>
        </div>

        <div className={styles.mapKeyword}>
          {map.keyword?.map((mapKeyword:KeywordType) => (
            <button
              className={
                selectedKeyword !== mapKeyword.title
                  ? styles.selected
                  : styles.keywordPills
              }
              key={mapKeyword.id}
              onClick={() => handleSelectPills(mapKeyword)}
            >
              {mapKeyword.title}
            </button>
          ))}
        </div>

        <div className={styles.keywordContainer}>
          {/* {selectedKeyword && (
            <MapKeywordCard
              isSelect={!!selectedKeyword}
              keyword={selectedKeyword}
            />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default MapList;
