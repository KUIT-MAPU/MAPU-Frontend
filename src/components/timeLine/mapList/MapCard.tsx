import React, { useEffect, useState } from 'react';
import mockData from './MapModel';
import { MapType } from '../../../types/MapType';
import { KeywordType } from '../../../types/KeywordType';
import useKeywordStore from '../../../stores/keywordStore';
import styles from './MapCard.module.scss';

import userImg from '../../../assets/user.svg';
import ico_carousel from '../../../assets/ico_carousel.svg';
import useRegisterStore from '../../../stores/registerStore';
import { RegisterStatus } from '../../../types/RegisterStatus';

const MapCard: React.FC = () => {
  const [mapData, setMapData] = useState<MapType[]>([]);
  const [isLog, setIsLog] = useState<Boolean>(false);
  const { selectedList } = useKeywordStore();
  const { registerStatus } = useRegisterStore();

  useEffect(() => {
    if (registerStatus === RegisterStatus.LOG_IN) {
      setIsLog(true);
    } else {
      setIsLog(false);
    }
  }, [registerStatus]);

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

  const handleForward = () => {
    
  }

  return (
    <div className={styles.mapcard}>
      {selectedList.map((keyword: KeywordType) => {
        const selectedMap = mapData.filter((map: MapType) =>
          map.keywords.includes(keyword.title),
        );

        return (
          <div key={keyword.id} className={styles.wrapper}>
            <div className={styles.keyword}>{keyword.title}</div>


            <div className={styles.mapContainer}>

            <div className={styles.buttonContainer}>
              <button className={styles.forward}>
                <img src={ico_carousel} />
              </button>

              <button className={styles.backward}>
                <img src={ico_carousel} />
              </button>
            </div>
              {selectedMap.map((map: MapType) => (
                <div key={map.id} className={styles.map}>
                  <img
                    src={map.img}
                    className={styles.mapImg}
                    alt={`${map.name} map`}
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
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MapCard;
