import { useEffect, useState } from 'react';
import styles from './MapBasicInfoContainer.module.scss';

import { useMapBasicInfoQuery } from '../../../../../apis/Map/fetchMapBasicInfo';
import useMapTitleEditMutation from '../../../../../apis/Map/useMapTitleEditMutation';
import useMapDescriptionEditMutation from '../../../../../apis/Map/useMapDescriptionEditMutation';
import useMapBookmarkEditMutation from '../../../../../apis/Map/useMapBookmarkEditMutation';

import useRegisterStore from '../../../../../stores/registerStore';

import { MapMode } from '../../../../../types/enum/MapMode';
import { RegisterStatus } from '../../../../../types/enum/RegisterStatus';

import BookmarkDefault from '../../../../../assets/btn_bookmark_default.svg';
import BookmarkSelected from '../../../../../assets/btn_bookmark_selected.svg';

interface Props {
  mode: MapMode;
  mapId: number;
}

const MapBasicInfoContainer: React.FC<Props> = ({ mode, mapId }) => {
  const { registerStatus, setLoginNeededStatus } = useRegisterStore();
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [editedDescription, setEditedDescription] = useState<string>('');

  const { mapBasicInfo, isMapBasicInfoLoading } = useMapBasicInfoQuery(
    mapId,
    mode,
  );

  useEffect(() => {
    if (!isMapBasicInfoLoading && mapBasicInfo !== undefined) {
      setEditedTitle(mapBasicInfo.result.title);
      setEditedDescription(mapBasicInfo.result.description);
    }
  }, [isMapBasicInfoLoading]);

  const handleTitleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.currentTarget.value);
  };

  const handleDescriptionOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setEditedDescription(e.currentTarget.value);
  };

  const mapTitleEditMutation = useMapTitleEditMutation(mapId);
  const mapDescriptionEditMutation = useMapDescriptionEditMutation(mapId);
  const mapBookmarkEditMutation = useMapBookmarkEditMutation(mapId);

  const handleFocusOutTitle = async () => {
    //지도 제목 저장 api 호출
    await mapTitleEditMutation.mutate(editedTitle);
  };

  const handleFocusOutDescription = async () => {
    //지도 설명 저장 api 호출
    await mapDescriptionEditMutation.mutate(editedDescription);
  };

  const handleSwitchIsBookmarked = async () => {
    if (registerStatus !== RegisterStatus.LOG_IN) {
      setLoginNeededStatus(true);
    } else {
      //북마크 설정 api 호출
      if (mapBasicInfo!.result.bookmarked)
        await mapBookmarkEditMutation.mutate(false);
      else await mapBookmarkEditMutation.mutate(true);
    }
  };
  return (
    <div className={styles.mapContentTitleContainer}>
      <div className={styles.mapInfoInputContainer}>
        <div className={styles.titleContainer}>
          <input
            type="text"
            name="mapTitle"
            id={styles.mapTitle}
            value={editedTitle}
            placeholder="지도 이름"
            onChange={handleTitleOnChange}
            onBlur={handleFocusOutTitle}
            disabled={mode === MapMode.VIEW ? true : false}
          />
          {mapBasicInfo !== undefined &&
            !mapBasicInfo.result.mine &&
            (mapBasicInfo.result.bookmarked ? (
              <img
                src={BookmarkSelected}
                alt="북마크함"
                className={styles.bookmarkBtn}
                onClick={handleSwitchIsBookmarked}
              />
            ) : (
              <img
                src={BookmarkDefault}
                alt="북마크하지 않음"
                className={styles.bookmarkBtn}
                onClick={handleSwitchIsBookmarked}
              />
            ))}
        </div>
        <textarea
          name="mapDescription"
          id={styles.mapDescription}
          placeholder="지도 설명"
          value={editedDescription}
          onChange={handleDescriptionOnChange}
          onBlur={handleFocusOutDescription}
          disabled={mode === MapMode.VIEW ? true : false}
        />
      </div>
      <div className={styles.locationInfoContainer}>
        <div className={styles.locationInfo}>
          <span className={styles.location__title}>위치</span>
          <span>
            {mapBasicInfo !== undefined && mapBasicInfo!.result.address}
          </span>
        </div>
        {/* TODO: 날씨, 미세/초미세 추후 목표로 보류 */}
        {/* <div className={styles.locationInfo}>
        <span className={styles.location__title}>날씨</span>
        <span>날씨 api 호출 결과</span>
      </div>
      <div className={styles.locationInfo}>
        <span className={styles.location__title}>미세/초미세</span>
        <span>미세먼지 api 호출 결과</span>
      </div> */}
      </div>
    </div>
  );
};

export default MapBasicInfoContainer;
