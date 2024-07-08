import { useEffect } from 'react';
import HeaderNavigation from '../components/timeLine/headerNavigatin/HeaderNavigation';

const TimeLine = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `홈 | MAPU`;
  }, []);

  return (
    <>
      <HeaderNavigation />
    </>
  );
};

export default TimeLine;
