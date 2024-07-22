import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MapInfoPanel from '../../components/map/MapInfoPanel/MapInfoPanel';

const Map = () => {
  const { mapName } = useParams();

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `${mapName!.replaceAll('-', ' ')} | MAPU`;
  }, [mapName]);
  return (
    <div>
      <MapInfoPanel />
    </div>
  );
};

export default Map;
