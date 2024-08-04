import React, { useEffect, useRef, useState } from 'react';
import { Map, DrawingManager } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../../../hooks/useKakaoLoader';
import styles from './BaseMap.module.scss';
import EditDesignPanel from './EditDesignPanel';

interface BaseMapProps {
  mode: string;
}

interface Position {
  lat: number;
  lng: number;
}

const BaseMap: React.FC<BaseMapProps> = ({ mode }) => {
  useKakaoLoader();

  const [position, setPosition] = useState<Position>({
    lat: 33.450701,
    lng: 126.570667,
  });

  const [isObject, setIsObject] = useState<string>('');
  const [strokeWeight, setStrokeWeight] = useState<number>(1.5);

  const managerRef =
    useRef<
      kakao.maps.drawing.DrawingManager<
        | kakao.maps.drawing.OverlayType.ARROW
        | kakao.maps.drawing.OverlayType.CIRCLE
        | kakao.maps.drawing.OverlayType.ELLIPSE
        | kakao.maps.drawing.OverlayType.MARKER
        | kakao.maps.drawing.OverlayType.POLYLINE
        | kakao.maps.drawing.OverlayType.RECTANGLE
        | kakao.maps.drawing.OverlayType.POLYGON
      >
    >(null);

  const handleShapeButtonClick = (type: 'marker' | 'polyline' | 'polygon') => {
    const manager = managerRef.current;

    if (manager) {
      setIsObject(type);
      const overlayType =
        kakao.maps.drawing.OverlayType[
          type.toUpperCase() as keyof typeof kakao.maps.drawing.OverlayType
        ];
      if (overlayType) {
        manager.cancel();
        manager.select(overlayType);
      }
    }
  };

  const handleLineButtonClick = (label: 'line thin' | 'line thick') => {
    const weight = label === 'line thin' ? 1.5 : 4.5;
    setStrokeWeight(weight);
  };

  useEffect(() => {
    console.log(isObject);
    console.log(strokeWeight);
  }, [isObject]);

  return (
    <>
      <Map center={position} className={styles.map} level={3}>
        <DrawingManager
          ref={managerRef}
          drawingMode={[
            'arrow',
            'circle',
            'ellipse',
            'marker',
            'polyline',
            'rectangle',
            'polygon',
          ]}
          guideTooltip={['draw', 'drag', 'edit']}
          markerOptions={{
            draggable: false,
            removable: true,
          }}
          polylineOptions={{
            draggable: false,
            removable: true,
            editable: true,
            strokeWeight: strokeWeight,
            strokeColor: '#111111',
            hintStrokeStyle: 'dash',
            hintStrokeOpacity: 0.5,
          }}
          rectangleOptions={{
            draggable: true,
            removable: true,
            editable: true,
            strokeColor: '#1111',
            fillColor: '#1111',
            fillOpacity: 0.2,
          }}
          circleOptions={{
            draggable: true,
            removable: true,
            editable: true,
            strokeColor: '#39f',
            fillColor: '#39f',
            fillOpacity: 0.5,
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
          arrowOptions={{
            draggable: true,
            removable: true,
            editable: true,
            strokeColor: '#39f',
            hintStrokeStyle: 'dash',
            hintStrokeOpacity: 0.5,
          }}
          ellipseOptions={{
            draggable: true,
            removable: true,
            editable: true,
            strokeColor: '#39f',
            fillColor: '#39f',
            fillOpacity: 0.5,
          }}
        />
      </Map>
      <EditDesignPanel
        mode={mode}
        object={isObject}
        handleShapeButtonClick={handleShapeButtonClick}
        handleLineButtonClick={handleLineButtonClick}
      />
    </>
  );
};

export default BaseMap;
