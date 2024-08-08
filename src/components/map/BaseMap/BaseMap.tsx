import React, { useRef, useState } from 'react';
import { Map, DrawingManager, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../../../hooks/useKakaoLoader';
import styles from './BaseMap.module.scss';
import EditDesignPanel from './EditDesignPanel';
import {ReactComponent as IconDot} from '../../../assets/map/ico_dot.svg';
import {ReactComponent as DotThick} from '../../../assets/map/ico_dot_thick.svg';
import {ReactComponent as DotThin} from '../../../assets/map/ico_dot_thin.svg';

interface BaseMapProps {
  mode: string;
}

interface Position {
  lat: number;
  lng: number;
}

interface Marker {
  img: React.ReactNode;
  pos: Position;
}

const BaseMap: React.FC<BaseMapProps> = ({ mode }) => {
  useKakaoLoader();

  const [position, setPosition] = useState<Position>({
    lat: 33.450701,
    lng: 126.570667,
  }); // 첫 지도 이미지

  const [marker, setMarker] = useState<Marker[] | null>(null);

  const [isObject, setIsObject] = useState<string>('');
  const [strokeWeight, setStrokeWeight] = useState<number>(1.5);
  const [dot, setDot] = useState<React.ReactNode>(<IconDot />);
  const [dotShape, setDotShape] = useState<boolean>(false);

  const managerRef =
    useRef<
      kakao.maps.drawing.DrawingManager<
        | kakao.maps.drawing.OverlayType.POLYLINE
        | kakao.maps.drawing.OverlayType.POLYGON
      >
    >(null);

  const mapRef = useRef<kakao.maps.Map>(null);

  type OverlayTypeString = 'polyline' | 'polygon';

  const handleShapeButtonClick = (type: OverlayTypeString) => {
    const manager = managerRef.current;
    setIsObject(type);
    if (manager) {
      manager.cancel();
      manager.select(type);
    }
  };

  const handleLineButtonClick = (label: 'line thin' | 'line thick') => {
    const weight = label === 'line thin' ? 1.5 : 4.5;
    const manager = managerRef.current;
    manager?.setStrokeWeight(weight);
  };

  const handleTransparentButtonClick = (
    label: 'face transparent 15' | 'face transparent 30',
  ) => {
    const transparent = label === 'face transparent 15' ? 0.2 : 0.5;
    const manager = managerRef.current;
    manager?.setStyle(
      kakao.maps.drawing.OverlayType.POLYGON,
      'fillOpacity',
      transparent,
    );
  };

  const handleColorButtonClick = (
    label: 'black' | 'red' | 'yellow' | 'green' | 'blue' | 'purple',
  ) => {
    let color: string;

    switch (label) {
      case 'black':
        color = '#111111';
        break;
      case 'red':
        color = '#FF4B12';
        break;
      case 'yellow':
        color = '#FFA011';
        break;
      case 'green':
        color = '#00BD57';
        break;
      case 'blue':
        color = '#0085FF';
        break;
      case 'purple':
        color = '#821FFF';
        break;
      default:
        color = '#111111'; // 기본 색상으로 설정
    }

    const manager = managerRef.current;
    manager?.setStrokeColor(label);
    manager?.setStyle(
      kakao.maps.drawing.OverlayType.POLYGON,
      'fillColor',
      color,
    );
  };

  const handleMoveButtonClick = (label: 'expansion' | 'reduction') => {
    const map = mapRef.current;
    console.log('map:', map);
    if (label === 'expansion') {
      map?.setLevel(map.getLevel() - 1);
    } else {
      map?.setLevel(map.getLevel() + 1);
    }
  };

  const handleDotShapeButtonClick = (label: boolean) => {
    if (label) {
      setDotShape(true);
      setIsObject('marker');
    }
  };

  const handleDotButtonClick = (label: 'dot thin' | 'dot thick') => {
    const dotImg = label === 'dot thin' ? <DotThin /> : <DotThick />;
    setDot(dotImg);
  };

  const getMarker = (position: Position) => {
    const pre = marker;
    if (pre) {
      setMarker([...pre, { img: dot, pos: position }]);
    } else {
      setMarker([{ img: dot, pos: position }]);
    }
  };

  const manager = managerRef.current;
  manager?.addListener('drawend', () => {
    setIsObject('');
  });

  return (
    <>
      <Map
        ref={mapRef}
        center={position}
        className={styles.map}
        level={3}
        onClick={(_, mouseEvent) => {
          const latlng = mouseEvent.latLng;
          getMarker({ lat: latlng.getLat(), lng: latlng.getLng() });
        }}
      >
        {marker?.map((item) => (
          <MapMarker
            position={item.pos}
            image={{
              src: item.img as unknown as string,
              size: {
                width: 24,
                height: 24,
              },
            }}
            onClick={(marker: kakao.maps.Marker) => {
              marker.setMap(null);
            }}
          />
        ))}
        <DrawingManager
          ref={managerRef}
          drawingMode={[
            kakao.maps.drawing.OverlayType.POLYLINE,
            kakao.maps.drawing.OverlayType.POLYGON,
          ]}
          guideTooltip={['draw', 'drag', 'edit']}
          polylineOptions={{
            draggable: false,
            removable: true,
            editable: true,
            strokeWeight: strokeWeight,
            strokeColor: '#111111',
            hintStrokeStyle: 'dash',
            hintStrokeOpacity: 0.5,
          }}
          polygonOptions={{
            draggable: false,
            removable: true,
            editable: true,
            strokeColor: '#111111',
            strokeWeight: strokeWeight,
            fillColor: '#111111',
            fillOpacity: 0.2,
            hintStrokeStyle: 'dash',
            hintStrokeOpacity: 0.5,
          }}
        />
      </Map>
      {mode === 'edit' ? (
        <EditDesignPanel
          mode={mode}
          object={isObject}
          managerRef={managerRef}
          handleShapeButtonClick={handleShapeButtonClick}
          handleDotShapeButtonClick={handleDotShapeButtonClick}
          handleLineButtonClick={handleLineButtonClick}
          handleTransparentButtonClick={handleTransparentButtonClick}
          handleColorButtonClick={handleColorButtonClick}
          handleMoveButtonClick={handleMoveButtonClick}
          handleDotButtonClick={handleDotButtonClick}
        />
      ) : null}
    </>
  );
};

export default BaseMap;
