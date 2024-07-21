import React, { useEffect, useState } from 'react';
import mockData from './MapModel';
import { MapType } from '../../../types/MapType';
import { KeywordType } from '../../../types/KeywordType';
import useKeywordStore from '../../../stores/keywordStore';
import styles from './MapCard.module.scss';

const MapCard: React.FC = () => {
  const [mapData, setMapData] = useState<MapType[]>([]);
  const { selectedList } = useKeywordStore();

  const fetchMapData = async () => {
    try {
      //TODO: API 연결 selectedList에 있는 mapData를 받아옴.
      setMapData(mockData);
    } catch {
      console.log('error');
    }
  };

  useEffect(() => {
    fetchMapData();
  }, []);

  console.log('mapData:', mapData);

  return (
    <div className={styles.mapcard}>
      {selectedList.map((keyword: KeywordType) => {
        const selectedMap = mapData.filter((map: MapType) =>
          map.keywords.includes(keyword.title),
        );

        return (
          <div key={keyword.id} className={styles.keyword}>
            {keyword.title}
            <div className={styles.mapContainer}>
              {selectedMap.map((map: MapType) => (
                <div className={styles.map}>
                  <img src={map.img} className={styles.mapImg} />

                  <div className={styles.info}>
                    <div className={styles.mapInfo}>
                      <div className={styles.title} key={map.id}>
                        {map.name}
                      </div>

                      <div className={styles.address} key={map.id}>
                        {map.address}
                      </div>
                    </div>

                    <div className={styles.editorImg} key={map.id}>
                      {map.editors.map((editor) => (
                        <img src={editor.img} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MapCard;
