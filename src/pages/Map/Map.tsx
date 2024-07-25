import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './Map.module.scss';
import dimmedStyles from '../../components/timeLine/Dimmed.module.scss';
import MapInfoPanel from '../../components/map/MapInfoPanel/MapInfoPanel';
import useRegisterStore from '../../stores/registerStore';
import { RegisterStatus } from '../../types/enum/RegisterStatus';
import AuthContainer from '../../components/login/AuthContainer';

//"editor"
//마이페이지 > 편집 가능한 지도에서의 접근이므로, 이미 로그인 된 상태일 것.
//=> registerStatus 변동 사항 추적 -> 로그인 상태 아니면 딤드 + AuthContainer 모달 띄움
//에디터에 접근 권한이 있는 사람은 지도의 '게시' 여부와 무관
//"viewer"
//공유 링크로 접근시 '게시' 여부 무관
//홈/탐색/다른사람유저페이지에서 접근시 '게시'여부 유관 -> 백엔드에서 필터링
const Map = () => {
  const pathname = useLocation().pathname;
  const mapMode = pathname.split('/').pop()!;
  const navigate = useNavigate();
  const { mapName } = useParams();
  const { registerStatus, loginNeeded, setLoginNeeded } = useRegisterStore();
  const [dimmed, setDimmed] = useState<boolean>(false);

  //TODO: 지도 정보 api 호출 -> react query의 캐시로 데이터 관리
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    //TODO: 지도 제목이 바뀐 경우, 이전으로 갔을 때 오류 반환해야 함
    //mapId를 통해 지도 정보 api 호출 -> 지도 제목이 일치하는지 확인 -> 불일치시 에러
    titleElement.innerHTML = `${mapName!.replaceAll('-', ' ')} | MAPU`;
  }, [mapName]);

  useEffect(() => {
    if (mapMode == 'edit') {
      //editor
      if (registerStatus !== RegisterStatus.LOG_IN) {
        setDimmed(true);
        setLoginNeeded(true);
      } else {
        setDimmed(false);
      }
    } else {
      //viewer
      if (registerStatus !== RegisterStatus.LOG_IN && loginNeeded) {
        setDimmed(true);
      } else {
        setDimmed(false);
      }
    }
  }, [registerStatus, loginNeeded]);

  const handleClose = () => {
    setLoginNeeded(false);
    const prevUrl = pathname.split('?')[0];
    navigate(prevUrl);
  };

  //map
  return (
    <div className={styles.map}>
      {dimmed && (
        <div
          className={dimmedStyles.background}
          onClick={mapMode === 'view' ? handleClose : undefined}
        />
      )}
      {dimmed && <AuthContainer className={styles.authContainer} />}
      <MapInfoPanel mode={mapMode} />
    </div>
  );
};

export default Map;
