import { useEffect, useRef, useState } from 'react';
import styles from './ObjectPropertyContainer.module.scss';
import publicStyles from '../ObjectContainerPublicStyle.module.scss';
import AddPropertyPopUp from './AddPropertyPopUp';
import PlusBtn from '../../../../assets/btn_plus_black.svg';
import { ObjectShape } from '../../../../types/enum/ObjectShape';
import { ObjectInfo } from '../../../../types/map/object/ObjectInfo';
import ObjectPropertyBox from './ObjectPropertyBox';
import { ObjectPropertyType } from '../../../../types/enum/ObjectPropertyType';
import { MapMode } from '../../../../types/enum/MapMode';

interface Props {
  mode: MapMode;
  object: ObjectInfo;
}

const OjbectPropertyContainer: React.FC<Props> = ({ mode, object }) => {
  const outside = useRef<HTMLDivElement>(null);
  const [isPopUp, setIsPopUp] = useState<boolean>(false);

  const handleAddProperty = (event: React.MouseEvent) => {
    setIsPopUp(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (outside.current && !outside.current.contains(event.target as Node)) {
        setIsPopUp(false);
      }
    };

    if (isPopUp) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopUp]);

  const getContainerClassName = () => {
    if (mode === MapMode.EDIT) {
      switch (object.shape) {
        case ObjectShape.POINT:
          return `${styles.objectPropertyContainer} ${styles.editorPointContainer}`;
        case ObjectShape.LINE:
          return `${styles.objectPropertyContainer} ${styles.editorLineContainer}`;
        default:
          return `${styles.objectPropertyContainer} ${styles.editorPlainContainer}`;
      }
    }
    if (mode === MapMode.VIEW) {
      switch (object.shape) {
        case ObjectShape.POINT:
          return `${styles.objectPropertyContainer} ${styles.viewerPointContainer}`;
        case ObjectShape.LINE:
          return `${styles.objectPropertyContainer} ${styles.viewerLineContainer}`;
        default:
          return `${styles.objectPropertyContainer} ${styles.viewerPlainContainer}`;
      }
    } //else return 'false'; //TODO: 잘못된 모드
  };

  return (
    <section className={getContainerClassName()}>
      <div className={styles.propertyContainerTitleBox}>
        <span className={publicStyles.boxTitle}>객체 정보 속성</span>
        {mode === MapMode.EDIT && (
          <button
            type="button"
            onClick={handleAddProperty}
            className={styles.plusBtnContainer}
          >
            <img src={PlusBtn} alt="속성 추가" />
          </button>
        )}
        {isPopUp && (
          <div ref={outside} className={styles.addPropertyPopUp}>
            <AddPropertyPopUp />
          </div>
        )}
      </div>
      <div className={styles.objectPropertyList}>
        {object.connections.length !== 0 && (
          <ObjectPropertyBox
            type={ObjectPropertyType.CONNECTION}
            values={object.connections}
            mode={mode}
          />
        )}
        {object.tags.length !== 0 && (
          <ObjectPropertyBox
            type={ObjectPropertyType.TAG}
            values={object.tags}
            mode={mode}
          />
        )}
        {object.starRatings.length !== 0 && (
          <ObjectPropertyBox
            type={ObjectPropertyType.STAR_RATING}
            values={object.starRatings}
            mode={mode}
          />
        )}
      </div>
    </section>
  );
};

export default OjbectPropertyContainer;
