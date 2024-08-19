import React, { useState } from 'react';
import styles from './MapList.module.scss';
import { Link } from 'react-router-dom';
import user_default from '../../assets/img_user_default_profile.svg';
import { ExploreMapType } from '../../types/mapData/ExploreMapType';
import { KeywordType } from '../../types/keywords/KeywordType';
import { MapsType } from '../../types/keywords/MapsType';
import MapKeywordCard from './MapKeywordCard';

interface MapListProps {
  map?: ExploreMapType;
  keywordMap?: MapsType[];
  keyword: KeywordType[] | KeywordType;
}

const MapList: React.FC<MapListProps> = ({ map, keywordMap }) => {
  const [selected, setSelected] = useState<{
    keyword: string;
    mapId: number;
  } | null>(null);

  const handleSelectPills = (mapKeyword: KeywordType, mapId: number) => {
    if (
      selected &&
      selected.keyword === mapKeyword.title &&
      selected.mapId === mapId
    ) {
      setSelected(null);
    } else {
      setSelected({ keyword: mapKeyword.title, mapId: mapId });
    }
  };

  return (
    <>
      {keywordMap ? (
        keywordMap.map((mapItem: MapsType) => (
          <div className={styles.MapListRoot} key={mapItem.mapId}>
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
                    {mapItem.mapAddress}
                  </span>
                </div>
                <span className={styles.description}>
                  {mapItem.madDescription}
                </span>
                <div className={styles.mapKeyword}>
                  {mapItem.mapKeywords?.map((mapKeyword: KeywordType) => (
                    <button
                      className={
                        selected?.keyword === mapKeyword.title &&
                        selected.mapId === mapItem.mapId
                          ? styles.selected
                          : styles.keywordPills
                      }
                      key={mapKeyword.id}
                      onClick={() =>
                        handleSelectPills(mapKeyword, mapItem.mapId)
                      }
                    >
                      {mapKeyword.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.keywordContainer}>
                {selected && selected.mapId === mapItem.mapId && (
                  <MapKeywordCard
                    keyword={selected.keyword}
                    mapId={selected.mapId}
                    isSelect={true}
                  />
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.MapListRoot}>
          <div className={styles.Images}>
            <Link
              to={`/map/${map?.mapId}/view`}
              style={{ textDecoration: 'none' }}
            >
              <img src={map?.imageUrl} className={styles.mapImg} alt="Map" />
            </Link>
            <div className={styles.editor}>
              <img
                className={styles.editorImg}
                src={map?.user.imgUrl ? map.user.imgUrl : user_default}
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
              <div className={styles.mapKeyword}>
                {map?.keyword?.map((mapKeyword: KeywordType) => (
                  <button
                    className={
                      selected?.keyword === mapKeyword.title &&
                      selected.mapId === map.mapId
                        ? styles.selected
                        : styles.keywordPills
                    }
                    key={mapKeyword.id}
                    onClick={() => handleSelectPills(mapKeyword, map.mapId)}
                  >
                    {mapKeyword.title}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.keywordContainer}>
              {selected && selected.mapId === map?.mapId && (
                <MapKeywordCard
                  keyword={selected.keyword}
                  mapId={selected.mapId}
                  isSelect={true}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MapList;
