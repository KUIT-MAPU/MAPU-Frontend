import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './Map.module.scss';
import dimmedStyles from '../../components/timeLine/Dimmed.module.scss';
import MapInfoPanel from '../../components/map/MapInfoPanel/MapInfoPanel';
import useMapInfoStore from '../../stores/mapInfoStore';
import useRegisterStore from '../../stores/registerStore';
import { RegisterStatus } from '../../types/enum/RegisterStatus';
import AuthContainer from '../../components/login/AuthContainer';

const Map = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const { mapName } = useParams();
  const { isPublished, isMine, amIEditor } = useMapInfoStore();
  const { registerStatus, setLoginNeeded } = useRegisterStore();
  const [dimmed, setDimmed] = useState<boolean>(false);

  //TODO: 권한 판단
  //[공유 링크, 일반 링크]
  //1. 지도의 publish 여부
  //1.1 pulish -> 지도 뷰어 표시 //확인 후 수정
  //1.2 publish X -> 1.2.1
  //1.2.1 로그인 여부
  //1.2.1.1 로그인 O -> 1.2.2
  //1.2.1.2 로그인 X -> 로그인 모달
  //1.2.2 지도 제작자 여부
  //1.2.2.1 지도 제작자 O -> 지도 에디터 표시
  //1.2.2.2 지도 제작자 X -> 1.2.3
  //1.2.3 편집자 여부
  //1.2.3.1 편집자 O -> 지도 데이터 표시(지도 제작자 프로필, 북마크 포함)
  //1.2.3.2 편집자 X -> 지도 뷰어 표시

  //TODO: 지도 정보 api 호출 -> react query의 캐시로 데이터 관리

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    //TODO: 지도 제목이 바뀐 경우, 이전으로 갔을 때 오류 반환해야 함
    //mapId를 통해 지도 정보 api 호출 -> 지도 제목이 일치하는지 확인 -> 불일치시 에러
    titleElement.innerHTML = `${mapName!.replaceAll('-', ' ')} | MAPU`;
  }, [mapName]);

  useEffect(() => {
    if (!isPublished) {
      if (registerStatus !== RegisterStatus.LOG_IN) {
        setLoginNeeded(true);
        setDimmed(true);
      } else {
        setDimmed(false);
      }
    }
  }, [isPublished, registerStatus]);

  const handleClose = () => {
    setLoginNeeded(false);
    const prevUrl = pathname.split('?')[0];
    navigate(prevUrl);
  };

  if (isMine || (!isMine && amIEditor))
    //지도 에디터
    return (
      <div className={styles.map}>
        {dimmed && (
          <div className={dimmedStyles.background} onClick={handleClose} />
        )}
        {dimmed && <AuthContainer className={styles.authContainer} />}
        <MapInfoPanel />
      </div>
    );
  return <>지도 뷰어</>;
};

export default Map;
