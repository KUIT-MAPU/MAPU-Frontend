import { useEffect } from 'react';

const Explore = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `탐색 | MAPU`;
  }, []);

  return <div>Explore</div>;
};

export default Explore;
