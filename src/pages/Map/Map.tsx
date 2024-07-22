import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Map.module.scss';

const Map = () => {
  const { mapName } = useParams();

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `${mapName!.replaceAll('-', ' ')} | MAPU`; //TODO: api 호출 -> '지도명 | MAPU' 설정
  }, []);

  return <div>Map</div>;
};

export default Map;
