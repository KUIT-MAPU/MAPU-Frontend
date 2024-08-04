import React, { useEffect } from 'react';

import ico_dot from '../../../assets/map/ico_dot.svg';
import ico_dot_thick from '../../../assets/map/ico_dot_thick.svg';
import ico_dot_thin from '../../../assets/map/ico_dot_thin.svg';
import ico_line from '../../../assets/map/ico_line.svg';
import ico_line_thick from '../../../assets/map/ico_line_thick.svg';
import ico_line_thin from '../../../assets/map/ico_line_thin.svg';
import ico_face from '../../../assets/map/ico_face.svg';
import ico_face_thin from '../../../assets/map/ico_face_thin.svg';
import ico_face_thick from '../../../assets/map/ico_face_thick.svg';
import ico_color_black from '../../../assets/map/ico_color_black.svg';
import ico_color_red from '../../../assets/map/ico_color_red.svg';
import ico_color_yellow from '../../../assets/map/ico_color_yellow.svg';
import ico_color_green from '../../../assets/map/ico_color_green.svg';
import ico_color_blue from '../../../assets/map/ico_color_blue.svg';
import ico_color_purple from '../../../assets/map/ico_color_purple.svg';
import ico_expansion from '../../../assets/map/ico_expansion.svg';
import ico_reduction from '../../../assets/map/ico_reduction.svg';
import ico_share from '../../../assets/map/ico_share.svg';
import ico_face_transparent_15 from '../../../assets/map/ico_face_transparent_15.svg';
import ico_face_transparent_30 from '../../../assets/map/ico_face_transparent_30.svg';

import styles from './EditDesignPanel.module.scss';

interface EditDesignPanelProps {
  mode: string;
  object: string;
  handleShapeButtonClick: (type: 'marker' | 'polyline' | 'polygon') => void;
  handelDotButtonClick?: () => void;
  handleLineButtonClick: (label: 'line thin' | 'line thick') => void;
  handleTransparentButtonClick?: () => void;
  handleColorButtonClick?: () => void;
  handleMoveButtonClick?: () => void;
  handleShareButtonClick?: () => void;
}

const EditDesignPanel: React.FC<EditDesignPanelProps> = ({
  mode,
  object,
  handleShapeButtonClick,
  handelDotButtonClick,
  handleLineButtonClick,
  handleTransparentButtonClick,
  handleColorButtonClick,
  handleMoveButtonClick,
  handleShareButtonClick,
}) => {

  return (
    <div
      className={`${styles.root} ${object === 'marker' && styles.markerRoot} ${object === 'polyline' && styles.polylineRoot} ${object === 'polygon' && styles.polygonRoot}`}
    >
      <div
        className={`${styles.design} ${object === 'marker' && styles.markerDesign} ${object === 'polyline' && styles.polylineDesign} ${object === 'polygon' && styles.polygonDesign}`}
      >
        <div className={`${object ? styles.shape : styles.noShape}`}>
          <div className={styles.shapeBtn}>
            <button
              className={styles.button}
              onClick={() => handleShapeButtonClick('marker')}
            >
              <img src={ico_dot} alt="marker" />
            </button>
            <button
              className={styles.button}
              onClick={() => handleShapeButtonClick('polyline')}
            >
              <img src={ico_line} alt="polyline" />
            </button>
            <button
              className={styles.button}
              onClick={() => handleShapeButtonClick('polygon')}
            >
              <img src={ico_face} alt="polygon" />
            </button>
          </div>
        </div>

        {object && (
          <div className={styles.line}>
            {object === 'marker' && (
              <div className={styles.lineBtn}>
                <button
                  className={styles.button}
                  onClick={handelDotButtonClick}
                >
                  <img src={ico_dot_thin} alt="dot thin" />
                </button>
                <button
                  className={styles.button}
                  onClick={handelDotButtonClick}
                >
                  <img src={ico_dot_thick} alt="dot thick" />
                </button>
              </div>
            )}

            {object === 'polyline' && (
              <div className={styles.lineBtn}>
                <button
                  className={styles.button}
                  onClick={() => handleLineButtonClick('line thin')}
                >
                  <img src={ico_line_thin} alt="line thin" />
                </button>
                <button
                  className={styles.button}
                  onClick={() => handleLineButtonClick('line thick')}
                >
                  <img src={ico_line_thick} alt="line thick" />
                </button>
              </div>
            )}

            {object === 'polygon' && (
              <div className={styles.lineBtn}>
                <button
                  className={styles.button}
                  onClick={() => handleLineButtonClick('line thin')}
                >
                  <img src={ico_face_thin} alt="face thin" />
                </button>
                <button
                  className={styles.button}
                  onClick={() => handleLineButtonClick('line thick')}
                >
                  <img src={ico_face_thick} alt="face thick" />
                </button>
              </div>
            )}
            <div className={styles.border}></div>
          </div>
        )}

        {object === 'polygon' && (
          <div className={styles.transparent}>
            <div className={styles.transparentBtn}>
              <button
                className={styles.button}
                onClick={handleTransparentButtonClick}
              >
                <img src={ico_face_transparent_15} alt="face transparent 15" />
              </button>
              <button
                className={styles.button}
                onClick={handleTransparentButtonClick}
              >
                <img src={ico_face_transparent_30} alt="face transparent 30" />
              </button>
            </div>
            <div className={styles.border}></div>
          </div>
        )}

        {object && (
          <div className={styles.color}>
            <div className={styles.colorBtn}>
              <button
                className={styles.button}
                onClick={handleColorButtonClick}
              >
                <img src={ico_color_black} alt="color black" />
              </button>
              <button
                className={styles.button}
                onClick={handleColorButtonClick}
              >
                <img src={ico_color_red} alt="color red" />
              </button>
              <button
                className={styles.button}
                onClick={handleColorButtonClick}
              >
                <img src={ico_color_yellow} alt="color yellow" />
              </button>
              <button
                className={styles.button}
                onClick={handleColorButtonClick}
              >
                <img src={ico_color_green} alt="color green" />
              </button>
              <button
                className={styles.button}
                onClick={handleColorButtonClick}
              >
                <img src={ico_color_blue} alt="color blue" />
              </button>
              <button
                className={styles.button}
                onClick={handleColorButtonClick}
              >
                <img src={ico_color_purple} alt="color purple" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={styles.move}>
        <button className={styles.button} onClick={handleMoveButtonClick}>
          <img src={ico_expansion} alt="expansion" />
        </button>
        <div className={styles.border}></div>
        <button className={styles.button} onClick={handleMoveButtonClick}>
          <img src={ico_reduction} alt="reduction" />
        </button>
      </div>

      <div className={styles.share}>
        <button className={styles.button} onClick={handleShareButtonClick}>
          <img src={ico_share} alt="share" />
        </button>
      </div>
    </div>
  );
};

export default EditDesignPanel;
