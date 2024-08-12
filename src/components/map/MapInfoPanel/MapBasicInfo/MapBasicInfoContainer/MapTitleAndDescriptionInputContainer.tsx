import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MapTitleAndDescriptionInputContainer.module.scss';
import useMapInfoStore from '../../../../../stores/mapInfoStore';
import BookmarkDefault from '../../../../../assets/btn_bookmark_default.svg';
import BookmarkSelected from '../../../../../assets/btn_bookmark_selected.svg';
import useRegisterStore from '../../../../../stores/registerStore';
import { RegisterStatus } from '../../../../../types/enum/RegisterStatus';
import { MapMode } from '../../../../../types/enum/MapMode';

interface Props {
  mode: MapMode;
}

const MapTitleAndDescriptionInputContainer: React.FC<Props> = ({ mode }) => {
  const {
    mapId,
    mapTitle,
    mapDescription,
    setTitle,
    setDescription,
    isMine,
    isBookmarked,
    switchIsBookmarked,
  } = useMapInfoStore();
  const { registerStatus, setLoginNeededStatus } = useRegisterStore();
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [editedDescription, setEditedDescription] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    setEditedTitle(mapTitle);
    setEditedDescription(mapDescription);
  }, []);

  const handleTitleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.currentTarget.value);
  };

  const handleDescriptionOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setEditedDescription(e.currentTarget.value);
  };

  const handleFocusOutTitle = () => {
    //TODO: 지도 제목 저장 api 호출, 응답으로 받은 지도 제목 사용
    setTitle(editedTitle);
    navigate(`/map/${editedTitle.replaceAll(' ', '-')}`);
  };

  const handleFocusOutDescription = () => {
    //TODO: 지도 설명 저장 api 호출
    setDescription(editedDescription);
  };

  const handleSwitchIsBookmarked = () => {
    if (registerStatus !== RegisterStatus.LOG_IN) {
      setLoginNeededStatus(true);
    } else {
      //TODO: 북마크 설정 api 호출
      switchIsBookmarked();
    }
  };

  return (
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
        {!isMine &&
          (isBookmarked ? (
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
  );
};

export default MapTitleAndDescriptionInputContainer;
