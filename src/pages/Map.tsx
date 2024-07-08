import { useEffect } from 'react';

const Map = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `지도 | MAPU`;
  }, []);

  return <div>Map</div>;
};

export default Map;
