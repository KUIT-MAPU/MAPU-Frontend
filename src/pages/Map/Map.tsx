import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MapInfoPanel from '../../components/map/MapInfoPanel/MapInfoPanel';

const Map = () => {
  const { mapName } = useParams();

  //TODO: 권한 판단
  //1. 로그인 여부
  //2. 지도 제작자 여부
  //3. 편집자 여부

  //TODO: 지도 정보 api 호출 -> react query의 캐시로 데이터 관리

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    //TODO: 지도 제목이 바뀐 경우, 이전으로 갔을 때 오류 반환해야 함
    //mapId를 통해 지도 정보 api 호출 -> 지도 제목이 일치하는지 확인 -> 불일치시 에러
    titleElement.innerHTML = `${mapName!.replaceAll('-', ' ')} | MAPU`;
  }, [mapName]);

  return (
    <>
      <MapInfoPanel />
    </>
  );
};

export default Map;
