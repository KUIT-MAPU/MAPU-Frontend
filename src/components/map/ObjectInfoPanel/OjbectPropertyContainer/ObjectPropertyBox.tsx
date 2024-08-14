import { useState } from 'react';
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

interface Props {
  mode: MapMode;
  type: ObjectPropertyType;
  values: ObjectOutline[] | string[] | StarRating[];
}

// 타입 가드 함수들
const isObjectOutlineArray = (
  values: ObjectOutline[] | string[] | StarRating[],
): values is ObjectOutline[] => {
  return (values as ObjectOutline[])[0] !== undefined;
};

const isTagArray = (
  values: ObjectOutline[] | string[] | StarRating[],
): values is string[] => {
  return typeof (values as string[])[0] === 'string';
};

const isStarRatingArray = (
  values: ObjectOutline[] | string[] | StarRating[],
): values is StarRating[] => {
  return (values as StarRating[])[0] !== undefined;
};

const ObjectPropertyBox: React.FC<Props> = ({ mode, type, values }) => {
  const [editedTag, setEditedTag] = useState<string>('');

  const handleTagNameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTag(e.currentTarget.value);
  };

  const handleAddTag = () => {
    //TODO: 태그 추가 api
    //글자수 검사 (1~10글자)
  };

  const handleDeleteTag = () => {
    //TODO: 태그 삭제 api
  };

  //connections
  if (type === ObjectPropertyType.CONNECTION && isObjectOutlineArray(values))
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
          {values.map((connectionObject) => (
            <div className={styles.connectionBox}>
              <div className={styles.objectShapeBox}>
                {connectionObject.shape === ObjectShape.POINT ? (
                  <img src={Point} alt="점 객체" />
                ) : connectionObject.shape === ObjectShape.LINE ? (
                  <img src={Line} alt="선 객체" />
                ) : (
                  <img src={Plane} alt="면 객체" />
                )}
              </div>
              <div className={styles.objectOutlineBox}>
                <span className={styles.objectName}>
                  {connectionObject.name}
                </span>
                <span className={styles.objectRoadNameAddress}>
                  {connectionObject.roadNameAddress}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  //tags
  if (type === ObjectPropertyType.TAG && isTagArray(values))
    return (
      <div className={styles.objectPropertyBox}>
        <div className={styles.propertyTitleContainer}>
          <span className={styles.propertyTitle}>태그</span>
          {mode === MapMode.EDIT && (
            <button type="button" className={styles.propertyMenuBtn}>
              <img src={MenuBtn} alt="메뉴" />
            </button>
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
          <div className={styles.tagContainer}>
            {values.map((tag) => (
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
                    type="button"
                    className={styles.deleteTagBtn}
                    onClick={handleDeleteTag}
                  >
                    <img src={DeleteBtn} alt="태그 지우기" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );

  //star ratings
  if (type === ObjectPropertyType.STAR_RATING && isStarRatingArray(values))
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
