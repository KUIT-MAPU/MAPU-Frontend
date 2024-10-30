import { useEffect, useCallback, useRef, useState } from 'react';
import styles from './EditorObjectInfoInputContainer.module.scss';
import publicStyles from '../ObjectContainerPublicStyle.module.scss';
import useMapInfoStore from '../../../../stores/mapInfoStore';
import { MapObject } from '../../../../types/map/object/ObjectInfo';

interface Props {
  name?: string;
  detailAddress?: string;
}

const EditorObjectInfoInputContainer: React.FC<Props> = ({
  name,
  detailAddress,
}) => {
  const [editedName, setEditedName] = useState<string>();
  const [isNameEmpty, setIsNameEmpty] = useState<boolean>(false);
  const [editedDetailAddress, setEditedDetailAddress] = useState<string>();
  const { selectedObjectId, doc } = useMapInfoStore();
  const selectedObject = useMapInfoStore((state) => state.getSelectedObject());
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setEditedName(name);
    setEditedDetailAddress(detailAddress);
  }, []);

  const handleNameOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditedName(e.target.value);
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = window.setTimeout(() => {
        doc?.update((root) => {
          const objectToUpdate = root.objects.find(
            (obj: MapObject) => obj.objectId === selectedObjectId,
          );
          if (objectToUpdate) {
            objectToUpdate.name = e.target.value;
          }
        }, `Update object ${selectedObjectId} name to ${e.target.value}`);
      }, 300);
    },
    [doc, selectedObjectId],
  );

  useEffect(() => {
    setEditedName(selectedObject?.name);
  }, [selectedObjectId]);

  const handleDetailAddressOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setEditedDetailAddress(e.currentTarget.value);
  };

  const handleFocusOutName = () => {
    if (editedName === '' || editedName === null) {
      setIsNameEmpty(true);
    } else {
      //TODO: 객체 이름 저장 api 호출
      setIsNameEmpty(false);
    }
  };

  const handleFocusOutDetailAddress = () => {
    //TODO: 객체 상세 주소 저장 api 호출
  };

  return (
    <section className={styles.editorObjectInfoInputContainer}>
      <div className={styles.inputContainer}>
        <span className={publicStyles.boxTitle}>이름</span>
        <input
          type="text"
          name="objectTitle"
          className={
            isNameEmpty
              ? `${styles.objectNameInput} ${styles.errorNameInput}`
              : styles.objectNameInput
          }
          value={selectedObject === undefined ? '' : editedName}
          placeholder="객체 이름 (필수)"
          onChange={handleNameOnChange}
          onBlur={handleFocusOutName}
          disabled={!selectedObjectId}
        />
      </div>
      {/* <div className={styles.inputContainer}>
        <span className={publicStyles.boxTitle}>상세 주소</span>
        <textarea
          name="objecyDetailAddress"
          className={styles.objectDetailAddressInput}
          value={editedDetailAddress}
          placeholder="객체 상세 주소 (선택)"
          onChange={handleDetailAddressOnChange}
          onBlur={handleFocusOutDetailAddress}
          disabled={!selectedObjectId}
        />
      </div> */}
    </section>
  );
};

export default EditorObjectInfoInputContainer;
