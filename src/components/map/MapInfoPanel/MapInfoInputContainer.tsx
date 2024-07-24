import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MapInfoInputContainer.module.scss';
import useMapInfoStore from '../../../stores/mapInfoStore';
import BookmarkDefault from '../../../assets/btn_bookmark_default.svg';
import BookmarkSelected from '../../../assets/btn_bookmark_selected.svg';

const MapInfoInputContainer = () => {
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
    switchIsBookmarked();
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
        />
        {!isMine &&
          (isBookmarked ? (
            <img
              src={BookmarkSelected}
              alt="북마크함"
              onClick={handleSwitchIsBookmarked}
            />
          ) : (
            <img
              src={BookmarkDefault}
              alt="북마크하지 않음"
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
      />
    </div>
  );
};

export default MapInfoInputContainer;
