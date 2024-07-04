import { useEffect, useRef, useState } from 'react';
import styles from './ObjectPropertyContainer.module.scss';
import publicStyles from '../ObjectContainerPublicStyle.module.scss';
import AddPropertyPopUp from './AddPropertyPopUp';
import PlusBtnGray from '../../../../assets/btn_plus_gray.svg';
import PlusBtn from '../../../../assets/btn_plus_black.svg';
import { ObjectShape } from '../../../../types/enum/ObjectShape';
import { MapObject } from '../../../../types/map/object/ObjectInfo';
import ObjectPropertyBox from './ObjectPropertyBox';
import { MapMode } from '../../../../types/enum/MapMode';
import useMapInfoStore from '../../../../stores/mapInfoStore';

interface Props {
  mode: MapMode;
  object?: MapObject;
}

const OjbectPropertyContainer: React.FC<Props> = ({ mode, object }) => {
  const outside = useRef<HTMLDivElement>(null);
  const [isPopUp, setIsPopUp] = useState<boolean>(false);
  const { innerData } = useMapInfoStore();
  const { selectedObjectId } = useMapInfoStore();

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
      switch (object?.shape) {
        case ObjectShape.POINT:
          return `${styles.objectPropertyList} ${styles.editorPointContainer}`;
        case ObjectShape.LINE:
          return `${styles.objectPropertyList} ${styles.editorLineContainer}`;
        default:
          return `${styles.objectPropertyList} ${styles.editorPlainContainer}`;
      }
    }
    if (mode === MapMode.VIEW) {
      switch (object?.shape) {
        case ObjectShape.POINT:
          return `${styles.objectPropertyList} ${styles.viewerPointContainer}`;
        case ObjectShape.LINE:
          return `${styles.objectPropertyList} ${styles.viewerLineContainer}`;
        default:
          return `${styles.objectPropertyList} ${styles.viewerPlainContainer}`;
      }
    } //else return 'false'; //TODO: 잘못된 모드
  };

  if (selectedObjectId === undefined)
    return (
      <section className={styles.objectPropertyContainer}>
        <div className={styles.propertyContainerTitleBox}>
          <span
            className={`${publicStyles.boxTitle} ${styles.noneOfObjectSelected}`}
          >
            객체 정보 속성
          </span>
          {mode === MapMode.EDIT && (
            <button type="button" className={styles.plusBtnContainer} disabled>
              <img src={PlusBtnGray} alt="속성 추가" />
            </button>
          )}
        </div>
      </section>
    );

  return (
    <section className={styles.objectPropertyContainer}>
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
      <div className={getContainerClassName()}>
        {innerData.informationAttributes.map((infoAttribute) => {
          return (
            <ObjectPropertyBox
              type={infoAttribute.type}
              mode={mode}
              attributeId={infoAttribute.id}
            />
          );
        })}
      </div>
    </section>
  );
};

export default OjbectPropertyContainer;
