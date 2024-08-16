import { MapType } from '../../types/MapType';
import user_default from '../../assets/img_user_default_profile.svg';
import styles from './MapList.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExploreMapType } from '../../types/mapData/ExploreMapType';
import { KeywordType } from '../../types/keywords/KeywordType';
import { MapsType } from '../../types/keywords/MapsType';

interface MapListProps {
  map?: ExploreMapType;
  keywordMap?: MapsType[];
  keyword: KeywordType[] | KeywordType;
}

const MapList: React.FC<MapListProps> = ({ map, keywordMap, keyword }) => {
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
      {keywordMap !== undefined ? (
        keywordMap.map((mapItem: MapsType, index: number) => (
          <div key={index}>
            <div className={styles.Images}>
              <Link
                to={`/map/${mapItem.mapTitle}/view`}
                style={{ textDecoration: 'none' }}
              >
                <img
                  src={mapItem.mapImage}
                  className={styles.mapImg}
                  alt="Map"
                />
              </Link>
              <div className={styles.editor}>
                <img
                  className={styles.editorImg}
                  src={mapItem.userImage ? mapItem.userImage : user_default}
                  alt="User"
                />
                <div className={styles.editorInfo}>
                  <span className={styles.editorName}>{mapItem.nickname}</span>
                  <span className={styles.editorId}>{mapItem.profileId}</span>
                </div>
              </div>
            </div>

            <div className={styles.mapInfo}>
              <div className={styles.mapContent}>
                <div className={styles.mapTitle}>
                  <span className={styles.mapName}>{mapItem.mapTitle}</span>
                  <span className={styles.mapAddress}>
                    지도 설명 API 추가 요청
                  </span>
                </div>
                <span className={styles.description}>
                  지도 설명 API 추가 요청
                </span>
              </div>

              <div className={styles.mapKeyword}>
                {/* {mapItem.keyword?.map((mapKeyword: KeywordType) => (
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
                ))} */}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
          <div className={styles.Images}>
            <Link
              to={`/map/${map?.title}/view`}
              style={{ textDecoration: 'none' }}
            >
              <img src={map?.imageUrl} className={styles.mapImg} alt="Map" />
            </Link>

            <div className={styles.editor}>
              <img
                className={styles.editorImg}
                src={map?.user.imageUrl ? map.user.imageUrl : user_default}
                alt="User"
              />
              <div className={styles.editorInfo}>
                <span className={styles.editorName}>{map?.user.nickName}</span>
                <span className={styles.editorId}>{map?.user.profileId}</span>
              </div>
            </div>
          </div>

          <div className={styles.mapInfo}>
            <div className={styles.mapContent}>
              <div className={styles.mapTitle}>
                <span className={styles.mapName}>{map?.title}</span>
                <span className={styles.mapAddress}>{map?.region}</span>
              </div>
              <span className={styles.description}>{map?.description}</span>
            </div>

            <div className={styles.mapKeyword}>
              {map?.keyword?.map((mapKeyword: KeywordType) => (
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
          </div>
        </div>
      )}
    </div>
  );
};

export default MapList;
