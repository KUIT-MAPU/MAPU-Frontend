import { getTsid } from 'tsid-ts';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import ReactDOMServer from 'react-dom/server';
import {
  Map,
  DrawingManager,
  MapMarker,
  Polyline,
  useMap,
  Polygon,
} from 'react-kakao-maps-sdk';
import useKakaoLoader from '../../../hooks/useKakaoLoader';
import styles from './BaseMap.module.scss';
import EditDesignPanel from './EditDesignPanel';
import { ReactComponent as DotThick } from '../../../assets/map/ico_dot_thick_custom.svg';
import { ReactComponent as DotThin } from '../../../assets/map/ico_dot_thin_custom.svg';
import useMapInfoStore from '../../../stores/mapInfoStore';
import { MapObject } from '../../../types/map/object/ObjectInfo';
import { ObjectShape } from '../../../types/enum/ObjectShape';

interface BaseMapProps {
  mode: string;
}

interface Position {
  lat: number;
  lng: number;
}

interface Marker {
  img: string;
  pos: Position;
}

interface DrawingObjects {
  polyline?: kakao.maps.drawing.DrawingPolylineData[];
  polygon?: kakao.maps.drawing.DrawingPolylineData[];
}

const useThrottle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): T => {
  const timeoutRef = useRef<number | null>(null);
  const lastRanRef = useRef<number>(0);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (now - lastRanRef.current >= delay) {
        func(...args);
        lastRanRef.current = now;
      } else if (!timeoutRef.current) {
        timeoutRef.current = window.setTimeout(() => {
          func(...args);
          lastRanRef.current = Date.now();
          timeoutRef.current = null;
        }, delay);
      }
    },
    [func, delay],
  ) as T;
};

const BaseMap: React.FC<BaseMapProps> = ({ mode }) => {
  useKakaoLoader();

  type OverlayTypeString = 'polyline' | 'polygon';

  const [position, setPosition] = useState<Position>({
    lat: 37.540957955055,
    lng: 127.08278172427,
  });

  const [isObject, setIsObject] = useState<string>('');
  const [strokeWeight, setStrokeWeight] = useState<number>(1.5);
  const [dot, setDot] = useState<string>(''); // 저장할 데이터는 Base64 문자열
  const [dotShape, setDotShape] = useState<string>('dot thin');
  const [dotColor, setDotColor] = useState<string>('#111111');
  const [isShare, setIsShare] = useState<boolean>(false);
  const [selectedMarker, setSelectedMarker] =
    useState<kakao.maps.Marker | null>(null); // 마커 지우기 위해서 사용
  const { innerData, doc, selectedObjectId, setSelectedObjectId } =
    useMapInfoStore();

  const managerRef =
    useRef<
      kakao.maps.drawing.DrawingManager<
        | kakao.maps.drawing.OverlayType.POLYLINE
        | kakao.maps.drawing.OverlayType.POLYGON
      >
    >(null);

  const mapRef = useRef<kakao.maps.Map>(null);

  const handleShapeButtonClick = (type: OverlayTypeString | 'dot') => {
    const manager = managerRef.current;
    setIsObject(type);
    if (manager && type !== 'dot') {
      manager.cancel();
      manager.select(type); // polyline 인지 polygon 인지 선택하기
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
        color = '#111111';
    }

    setDotColor(color);
    const manager = managerRef.current;
    manager?.setStrokeColor(color);
    manager?.setStyle(
      kakao.maps.drawing.OverlayType.POLYGON,
      'fillColor',
      color,
    );
  };

  const handleMoveButtonClick = (label: 'expansion' | 'reduction') => {
    const map = mapRef.current;
    if (label === 'expansion') {
      map?.setLevel(map.getLevel() - 1);
    } else {
      map?.setLevel(map.getLevel() + 1);
    }
  };

  const handleDotButtonClick = (label: 'dot thin' | 'dot thick') => {
    const DotComponent = label === 'dot thin' ? DotThin : DotThick;
    setDotShape(label);
    const dotImg = <DotComponent stroke={dotColor} />;
    const svgString = ReactDOMServer.renderToStaticMarkup(dotImg);
    const base64Svg = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;
    setDot(base64Svg);
  };

  useEffect(() => {
    if (isObject === 'dot') {
      const dotImg = isObject ? (
        dotShape === 'dot thin' ? (
          <DotThin stroke={dotColor} fill={dotColor} />
        ) : (
          <DotThick stroke={dotColor} />
        )
      ) : null;
      if (dotImg) {
        const svgString = ReactDOMServer.renderToStaticMarkup(dotImg);
        const base64Svg = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;
        setDot(base64Svg);
      }
    }
  }, [dotColor, dotShape, isObject]);

  const getMarker = (position: Position) => {
    const id = getTsid().toString();
    doc?.update((root) => {
      root.objects.push({
        objectId: id,
        type: ObjectShape.POINT,
        name: ObjectShape.POINT,
        shape: {
          img: dot,
          pos: position,
        },
        geoAttribute: {},
        userAttribute: {},
      });
    }, `Add object ${id}(${ObjectShape.POINT})`);
    setIsObject('');
    setDotColor('#111111');
    setDotShape('dot thin');
  };

  const manager = managerRef.current;
  useEffect(() => {
    manager?.addListener('drawend', (event) => {
      const objectType = event.overlayType;
      const datas = manager?.getData([objectType])[objectType];
      const overlays = manager?.getOverlays([objectType])[objectType];

      const id = getTsid().toString();
      const lastIndex = datas.length - 1;
      if (objectType === 'polyline' || 'polygon') {
        const objectShape = datas[lastIndex];
        let geoAttribute = {};

        if (objectType === 'polyline') {
          // @ts-ignore 카카오맵 라이브러리 이슈
          geoAttribute = { length: overlays[lastIndex].getLength() };
        } else if (objectType === 'polygon') {
          geoAttribute = {
            // @ts-ignore 카카오맵 라이브러리 이슈
            perimeter: overlays[lastIndex].getLength(),
            // @ts-ignore 카카오맵 라이브러리 이슈
            area: overlays[lastIndex].getArea(),
          };
        }

        doc?.update((root) => {
          root.objects.push({
            objectId: id,
            type: objectType,
            name: objectType,
            shape: objectShape,
            geoAttribute: geoAttribute,
            userAttribute: {},
          });
        }, `Add object ${id}(${objectType})`);
      }

      manager.setStrokeWeight(1.5);
      manager.setStrokeColor('#111111');
      manager.setStyle(
        kakao.maps.drawing.OverlayType.POLYGON,
        'fillColor',
        '#111111',
      );
      manager.setStyle(
        kakao.maps.drawing.OverlayType.POLYGON,
        'fillOpacity',
        0.2,
      );
      manager.remove(event.target);
    });
  }, [manager]);

  useEffect(() => {
    if (innerData.objects && innerData.objects.length > 0) {
      setIsShare(true);
    } else {
      setIsShare(false);
    }
  }, [innerData.objects]);

  const handleDeleteKey = useThrottle((ev: KeyboardEvent) => {
    if (
      (ev.key === 'Delete' || (ev.key === 'Backspace' && ev.metaKey)) &&
      selectedObjectId
    ) {
      doc?.update((root) => {
        const indexToDelete = root.objects.findIndex(
          (obj: MapObject) => obj.objectId === selectedObjectId,
        );

        if (indexToDelete !== -1) {
          root.objects.splice(indexToDelete, 1);
          setSelectedObjectId(undefined);
        }
      }, `Delete object ${selectedObjectId}`);
    }
  }, 300);

  useEffect(() => {
    document.addEventListener('keydown', handleDeleteKey);
    return () => {
      document.removeEventListener('keydown', handleDeleteKey);
    };
  }, [handleDeleteKey]);

  window.addEventListener('keydown', (ev: KeyboardEvent) => {
    if (ev.key === 'Escape' && selectedObjectId) {
      setSelectedObjectId("");
    }
  });

  function pointsToPath(points: Array<{ x: number; y: number }>) {
    return points.map((point) => ({
      lat: point.y,
      lng: point.x,
    }));
  }

  return (
    <>
      <Map
        ref={mapRef}
        center={position}
        className={styles.map}
        level={3}
        onClick={(_, mouseEvent) => {
          if (isObject === 'dot') {
            const latlng = mouseEvent.latLng;
            getMarker({ lat: latlng.getLat(), lng: latlng.getLng() });
          }
        }}
      >
        {innerData.objects?.map((object: MapObject) => {
          if (object.type === ObjectShape.POINT) {
            return (
              <MapMarker
                key={object.objectId}
                position={{
                  lat: object.shape.pos.lat,
                  lng: object.shape.pos.lng,
                }}
                image={{
                  src: object.shape.img,
                  size: {
                    width: 24,
                    height: 24,
                  },
                }}
                onClick={() => setSelectedObjectId(object.objectId)}
              />
            );
          } else if (object.type === ObjectShape.LINE) {
            return (
              <Polyline
                key={object.objectId}
                path={pointsToPath(object.shape.points)}
                {...object.shape.options}
                onMouseover={(target, mouseEvent) => {
                  console.log('mouseover', target, mouseEvent);
                }}
                onClick={() => setSelectedObjectId(object.objectId)}
              />
            );
          } else if (object.type === ObjectShape.PLANE) {
            return (
              <Polygon
                key={object.objectId}
                path={pointsToPath(object.shape.points)}
                {...object.shape.options}
                onClick={() => setSelectedObjectId(object.objectId)}
              />
            );
          }
        })}
        <DrawingManager
          ref={managerRef}
          drawingMode={[
            kakao.maps.drawing.OverlayType.POLYLINE,
            kakao.maps.drawing.OverlayType.POLYGON,
          ]}
          guideTooltip={['draw', 'drag', 'edit']}
          polylineOptions={{
            draggable: false,
            removable: false,
            editable: false,
            strokeWeight: strokeWeight,
            strokeColor: '#111111',
            hintStrokeStyle: 'dash',
            hintStrokeOpacity: 0.5,
          }}
          polygonOptions={{
            draggable: false,
            removable: false,
            editable: false,
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
          object={isObject}
          isShare={isShare}
          managerRef={managerRef}
          handleShapeButtonClick={handleShapeButtonClick}
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
