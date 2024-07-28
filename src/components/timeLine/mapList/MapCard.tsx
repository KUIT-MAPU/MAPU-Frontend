import React, { useEffect, useState } from 'react';
import mockData from './MapModel';
import { MapType } from '../../../types/MapType';
import { KeywordType } from '../../../types/KeywordType';
import useKeywordStore from '../../../stores/keywordStore';
import styles from './MapCard.module.scss';

import userImg from '../../../assets/user.svg';
import ico_carousel_backward from '../../../assets/ico_carousel_backward.svg';
import ico_carousel_forward from '../../../assets/ico_carousel_forward.svg';
import useRegisterStore from '../../../stores/registerStore';
import { RegisterStatus } from '../../../types/RegisterStatus';

interface MapCardProps {
  mapData:MapType[];
  isLog:Boolean;
  keyword:string;
}

interface RenderingMap {
  [keyword: string]: MapType[];
}

const MapCard: React.FC<MapCardProps> = ({mapData,isLog, keyword}) => {
  // const [mapData, setMapData] = useState<MapType[]>([]);
  // const [isLog, setIsLog] = useState<Boolean>(false);
  const [sliceMap,setSliceMap] = useState<RenderingMap>({});
  // const { selectedList } = useKeywordStore();
  // const { registerStatus } = useRegisterStore();

  // useEffect(() => {
  //   if (registerStatus === RegisterStatus.LOG_IN) {
  //     setIsLog(true);
  //   } else {
  //     setIsLog(false);
  //   }
  // }, [registerStatus]);

  // const fetchMapData = async () => {
  //   try {
  //     //TODO: API 연결 selectedList에 있는 mapData를 받아옴.
  //     setMapData(mockData);
  //   } catch {
  //     console.log('error');
  //   }
  // };

  // useEffect(() => {
  //   fetchMapData();
  // }, []);

  // useEffect(() => {
  //   if (mapData.length > 0 && selectedList.length > 0) {
  //     const updatedMap = selectedList.reduce<RenderingMap>((acc, keyword) => {
  //       const filteredMaps = mapData.filter(map =>
  //         map.keywords.includes(keyword.title)
  //       );
  //       acc[keyword.title] = filteredMaps;
  //       return acc;
  //     }, {});
  //     const initialSlice = selectedList.reduce<RenderingMap>((acc, keyword) => {
  //       const filteredMaps = updatedMap[keyword.title] || [];
  //       acc[keyword.title] = filteredMaps.slice(0, 3); // Initial slice
  //       return acc;
  //     }, {});
  //     setSliceMap(initialSlice);
  //   }
  // }, [mapData, selectedList]);


  const handleForward = (keyword: string) => {
    setSliceMap(prevState => {
      const currentMaps = prevState[keyword] || [];
      const fullMap = mapData.filter(map =>
        map.keywords.includes(keyword)
      );
      const currentIndex = currentMaps.length;
      console.log('currnetIndex:',currentIndex);
      const newSlice = fullMap.slice(currentIndex, currentIndex + 3); // Show 3 items at a time

      console.log(newSlice);
      console.log('prevState:',prevState);
      console.log('currentMap:',currentMaps);
      console.log('fullMap:',fullMap);
      if (newSlice.length > 0) {
        return {
          ...prevState,
          [keyword]: [...currentMaps, ...newSlice]
        };
      }
      return prevState;
    });
  };

  const handleBackward = (keyword: string) => {
    setSliceMap(prevState => {
      const currentMaps = prevState[keyword] || [];
      const fullMap = mapData.filter(map =>
        map.keywords.includes(keyword)
      );
      const currentIndex = currentMaps.length;

      if (currentIndex > 2) {
        const newSlice = fullMap.slice(currentIndex-1 ,currentIndex + 2); // Show 3 items at a time, back from the previous slice
        // console.log(newSlice);
        return {
          ...prevState,
          [keyword]: newSlice
        };
      }
      return prevState;
    });
  };

  return (
    <div className={styles.mapcard}>
          <div className={styles.wrapper}>
            <div className={styles.keyword}>{keyword}</div>

            <div className={styles.mapContainer}>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.forward}
                  onClick={() => handleForward(keyword)}
                >
                  <img src={ico_carousel_forward} alt="Backward" />
                </button>

                <button
                  className={styles.backward}
                  onClick={() => handleBackward(keyword)}
                >
                  <img src={ico_carousel_backward} alt="Forward" />
                </button>
              </div>
              {mapData.map(map => (
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
    </div>
  );
};

export default MapCard;

