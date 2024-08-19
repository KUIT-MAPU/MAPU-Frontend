import { useState, useCallback, useRef, useEffect } from 'react';
import styles from './ObjectPropertyBox.module.scss';
import { ObjectOutline } from '../../../../types/map/object/ObjectOutline';
import { StarRating } from '../../../../types/map/object/StarRating';
import { ObjectPropertyType } from '../../../../types/enum/ObjectPropertyType';
import { ObjectShape } from '../../../../types/enum/ObjectShape';
import { MapMode } from '../../../../types/enum/MapMode';
import MenuBtn from '../../../../assets/btn_menu_gray.svg';
import Point from '../../../../assets/map/ico_point.svg';
import Line from '../../../../assets/map/ico_line.svg';
import Plane from '../../../../assets/map/ico_point.svg';
import DeleteBtn from '../../../../assets/btn_delete.svg';
import useMapInfoStore from '../../../../stores/mapInfoStore';
import { MapObject } from '../../../../types/map/object/ObjectInfo';

interface Props {
  mode: MapMode;
  type: ObjectPropertyType;
  attributeId: string;
}

const ObjectPropertyBox: React.FC<Props> = ({ mode, type, attributeId }) => {
  const [editedTag, setEditedTag] = useState<string>('');
  const selectedObject = useMapInfoStore((state) => state.getSelectedObject());
  const objects = useMapInfoStore((state) => state.getObjects());
  const { selectedObjectId, doc } = useMapInfoStore();
  const outside = useRef<HTMLDivElement>(null);
  const [isTagMenuPopUp, setIsTagMenuPopUp] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (outside.current && !outside.current.contains(event.target as Node)) {
        setIsTagMenuPopUp(false);
      }
    };

    if (isTagMenuPopUp) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTagMenuPopUp]);

  const handleTagMenuBtnOnClick = (event: React.MouseEvent) => {
    setIsTagMenuPopUp(true);
  };

  const handleTagNameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTag(e.currentTarget.value);
  };

  const handleDeleteAllTagsOnClick = (attributeId: string) => {
    doc?.update((root) => {
      const objectToUpdate = root.objects.find(
        (obj: MapObject) => obj.objectId === selectedObjectId,
      );
      if (objectToUpdate && objectToUpdate.userAttribute[attributeId]) {
        delete objectToUpdate.userAttribute[attributeId];
      }
    });
  };

  const handleAddTag = () => {
    doc?.update((root) => {
      const objectToUpdate = root.objects.find(
        (obj: MapObject) => obj.objectId === selectedObjectId,
      );
      if (objectToUpdate) {
        if (!objectToUpdate.userAttribute[attributeId]) {
          objectToUpdate.userAttribute[attributeId] = [];
        }
        objectToUpdate.userAttribute[attributeId].push(editedTag);
      }
    });
    setEditedTag('');
    //TODO: 글자수 검사 (1~10글자)
  };

  const timerRef = useRef<number | null>(null);

  const handleDeleteTag = useCallback(
    (tag: string) => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = window.setTimeout(() => {
        {
          doc?.update((root) => {
            const objectToUpdate = root.objects.find(
              (obj: MapObject) => obj.objectId === selectedObjectId,
            );
            if (objectToUpdate && objectToUpdate.userAttribute[attributeId]) {
              const updatedTags = (
                objectToUpdate.userAttribute[attributeId] as string[]
              ).filter((t: string) => t !== tag);
              objectToUpdate.userAttribute[attributeId] = updatedTags;
            }
          }, `Delete tag ${tag} from object ${selectedObjectId}`);
        }
      }, 200);
    },
    [selectedObjectId, attributeId],
  );

  //connections
  if (type === ObjectPropertyType.CONNECTION)
    return (
      <div className={styles.objectPropertyBox}>
        <div className={styles.propertyTitleContainer}>
          <span className={styles.propertyTitle}>객체 연결</span>
          {mode === MapMode.EDIT && (
            <button type="button" className={styles.propertyMenuBtn}>
              <img src={MenuBtn} alt="메뉴" />
            </button>
          )}
        </div>
        <div className={styles.propertyBox}>
          {selectedObject?.userAttribute[attributeId]?.map(
            (connectionObjectId: string) => {
              const connectionObject = objects.find(
                (obj) => obj.objectId === connectionObjectId,
              );
              return (
                <div className={styles.connectionBox}>
                  <div className={styles.objectShapeBox}>
                    {connectionObject?.type === ObjectShape.POINT ? (
                      <img src={Point} alt="점 객체" />
                    ) : connectionObject?.type === ObjectShape.LINE ? (
                      <img src={Line} alt="선 객체" />
                    ) : (
                      <img src={Plane} alt="면 객체" />
                    )}
                  </div>
                  <div className={styles.objectOutlineBox}>
                    <span className={styles.objectName}>
                      {connectionObject?.name}
                    </span>
                    <span className={styles.objectRoadNameAddress}>
                      {connectionObject?.geoAttribute.roadNameAddress}
                    </span>
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>
    );

  //tags
  if (type === ObjectPropertyType.TAG)
    return (
      <div className={styles.objectPropertyBox}>
        <div className={styles.propertyTitleContainer}>
          <span className={styles.propertyTitle}>태그</span>
          {mode === MapMode.EDIT && (
            <button
              type="button"
              className={styles.propertyMenuBtn}
              onClick={handleTagMenuBtnOnClick}
            >
              <img src={MenuBtn} alt="메뉴" />
            </button>
          )}
          {isTagMenuPopUp && (
            <div
              ref={outside}
              className={styles.deleteAllTagPopUp}
              onClick={() => handleDeleteAllTagsOnClick(attributeId)}
            >
              <span>모든 태그 삭제하기</span>
            </div>
          )}
        </div>
        <div className={styles.propertyBox}>
          {mode === MapMode.EDIT && (
            <div className={styles.tagInputContainer}>
              <input
                type="text"
                value={editedTag}
                placeholder="태그 이름"
                className={styles.tagNameInput}
                maxLength={10}
                onChange={handleTagNameOnChange}
                disabled={!selectedObject}
              />
              <button
                type="button"
                className={styles.addTagBtn}
                onClick={handleAddTag}
                disabled={editedTag.length === 0 ? true : false}
              >
                <span>추가</span>
              </button>
            </div>
          )}
          {selectedObject?.userAttribute[attributeId] !== undefined &&
            selectedObject?.userAttribute[attributeId].length > 0 && (
              <div className={styles.tagContainer}>
                {selectedObject?.userAttribute[attributeId]?.map(
                  (tag: string) => (
                    <div
                      className={
                        mode === MapMode.EDIT
                          ? styles.tagBox
                          : `${styles.tagBox} ${styles.viewerTagBox}`
                      }
                    >
                      <span className={styles.tagName}>{tag}</span>
                      {mode === MapMode.EDIT && (
                        <button
                          key={tag}
                          type="button"
                          className={styles.deleteTagBtn}
                          onClick={() => handleDeleteTag(tag)}
                        >
                          <img src={DeleteBtn} alt="태그 지우기" />
                        </button>
                      )}
                    </div>
                  ),
                )}
              </div>
            )}
        </div>
      </div>
    );

  //star ratings
  if (type === ObjectPropertyType.STAR_RATING)
    return (
      <div className={styles.objectPropertyBox}>
        <div className={styles.propertyTitleContainer}>
          <span className={styles.propertyTitle}>별점</span>
          {mode === MapMode.EDIT && (
            <button type="button" className={styles.propertyMenuBtn}>
              <img src={MenuBtn} alt="메뉴" />
            </button>
          )}
        </div>
        <div className={styles.propertyBox}></div>
      </div>
    );

  return <></>; //잘못된 객체 정보 속성 타입
};

export default ObjectPropertyBox;
