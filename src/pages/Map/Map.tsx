import yorkie, { Client, Document } from 'yorkie-js-sdk';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './Map.module.scss';
import dimmedStyles from '../../components/timeLine/Dimmed.module.scss';
import useRegisterStore from '../../stores/registerStore';
import { RegisterStatus } from '../../types/enum/RegisterStatus';
import MapInfoPanel from '../../components/map/MapInfoPanel/MapInfoPanel';
import ObjectInfoPanel from '../../components/map/ObjectInfoPanel/ObjectInfoPanel';
import AuthContainer from '../../components/login/AuthContainer';
import BaseMap from '../../components/map/BaseMap/BaseMap';
import EditDesignPanel from '../../components/map/BaseMap/EditDesignPanel';
import GlobalNavigationBar from '../../components/global/GlobalNavigationBar';
import { MapMode } from '../../types/enum/MapMode';
import { YorkieDocType } from '../../types/map/object/ObjectInfo';
import useMapInfoStore from '../../stores/mapInfoStore';

//"editor"
//마이페이지 > 편집 가능한 지도에서의 접근이므로, 이미 로그인 된 상태일 것.
//=> registerStatus 변동 사항 추적 -> 로그인 상태 아니면 딤드 + AuthContainer 모달 띄움
//에디터에 접근 권한이 있는 사람은 지도의 '게시' 여부와 무관
//"viewer"
//공유 링크로 접근시 '게시' 여부 무관
//홈/탐색/다른사람유저페이지에서 접근시 '게시'여부 유관 -> 백엔드에서 필터링
const Map = () => {
  const pathname = useLocation().pathname;
  const mapMode =
    pathname.split('/').pop()! === MapMode.EDIT
      ? MapMode.EDIT
      : pathname.split('/').pop()! === MapMode.VIEW
        ? MapMode.VIEW
        : MapMode.UNVALID; //error;
  const navigate = useNavigate();
  const { mapName } = useParams();
  const { registerStatus, loginNeeded, setLoginNeededStatus } =
    useRegisterStore();
  const [dimmed, setDimmed] = useState<boolean>(false);
  const [client, setClient] = useState<Client>();
  const {
    doc,
    setDoc: setYorkieDoc,
    setInformationAttributes,
    setObjects,
    setInnerData,
  } = useMapInfoStore();

  useEffect(() => {
    if (mapMode === MapMode.UNVALID) {
      //TODO: error 잘못된 접근 (모드)
    }
  }, []);

  //TODO: 지도 정보 api 호출 -> react query의 캐시로 데이터 관리
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    //TODO: 지도 제목이 바뀐 경우, 이전으로 갔을 때 오류 반환해야 함
    //mapId를 통해 지도 정보 api 호출 -> 지도 제목이 일치하는지 확인 -> 불일치시 에러
    titleElement.innerHTML = `${mapName!.replaceAll('-', ' ')} | MAPU`;
  }, [mapName]);

  useEffect(() => {
    if (mapMode === MapMode.EDIT) {
      //editor
      if (registerStatus !== RegisterStatus.LOG_IN) {
        setDimmed(true);
        setLoginNeededStatus(true);
      } else {
        setDimmed(false);
      }
    }
    if (mapMode === MapMode.VIEW) {
      //viewer
      if (registerStatus !== RegisterStatus.LOG_IN && loginNeeded) {
        setDimmed(true);
      } else {
        setDimmed(false);
      }
    }
    //else: 잘못된 접근(모드)
  }, [registerStatus, loginNeeded]);

  const handleClose = () => {
    setLoginNeededStatus(false);
    const prevUrl = pathname.split('?')[0];
    navigate(prevUrl);
  };

  useEffect(() => {
    const YORKIE_CLIENT_API_KEY = process.env.REACT_APP_YORKIE_API_KEY;
    const YORKIE_ENDPOINT = process.env.REACT_APP_YORKIE_URL;

    if (!mapName || !YORKIE_CLIENT_API_KEY || !YORKIE_ENDPOINT) {
      return;
    }

    const initializeYorkie = async () => {
      const client = new yorkie.Client(YORKIE_ENDPOINT, {
        apiKey: YORKIE_CLIENT_API_KEY,
      });
      await client.activate();

      const doc = new yorkie.Document<YorkieDocType>(mapName);
      await client.attach(doc);

      doc.update((root) => {
        if (!root.informationAttributes) root.informationAttributes = [];
        if (!root.objects) root.objects = [];
        setInnerData(root);
      }, 'initialize document');

      setClient(client);
      setYorkieDoc(doc);
    };

    initializeYorkie();

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [mapName]);

  if (!client || !doc) {
    return <div>Loading...</div>;
  }

  if (mapMode === MapMode.EDIT) {
    doc.subscribe('$.informationAttributes', (event) => {
      console.log('informationAttributes updated', event);
      setInformationAttributes(doc.getRoot().informationAttributes);
    });

    doc.subscribe('$.objects', (event) => {
      console.log('objects updated', event);
      setObjects(doc.getRoot().objects);
    });
  }

  // map
  return (
    <div className={styles.map}>
      {dimmed && (
        <div
          className={dimmedStyles.background}
          onClick={mapMode === MapMode.VIEW ? handleClose : undefined}
        />
      )}
      {dimmed && <AuthContainer className={styles.authContainer} />}
      <GlobalNavigationBar />
      <MapInfoPanel mode={mapMode} />
      <BaseMap mode={mapMode} />
      <ObjectInfoPanel mode={mapMode} />
      <div className={styles.main}>
        <MapInfoPanel mode={mapMode} />
        <BaseMap mode={mapMode} />
        <ObjectInfoPanel mode={mapMode} />
      </div>
    </div>
  );
};

export default Map;
