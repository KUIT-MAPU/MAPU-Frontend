import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MapObject, YorkieDocType } from '../types/map/object/ObjectInfo';
import { Document } from 'yorkie-js-sdk';

interface State {
  innerData: YorkieDocType;
  selectedObjectId?: string;
  doc?: Document<any, any>;

  setDoc: (doc: Document<any, any>) => void;
  setInnerData: (innerData: YorkieDocType) => void;
  setObjects: (objects: YorkieDocType['objects']) => void;
  setInformationAttributes: (
    attributes: YorkieDocType['informationAttributes'],
  ) => void;
  setSelectedObjectId: (objectId: string | undefined) => void;
  getObjects: () => YorkieDocType['objects'];
  getObjectById: (objectId: string) => MapObject | undefined;
  getSelectedObject: () => MapObject | undefined;
}

const useMapInfoStore = create(
  persist<State>(
    (set, get) => ({
      innerData: {
        informationAttributes: [],
        objects: [],
      } as YorkieDocType,
      selectedObjectId: undefined,
      doc: undefined,

      setDoc: (doc) => set({ doc }),
      setInnerData: (innerData) => set({ innerData }),
      setObjects: (objects) =>
        set((state) => ({
          innerData: {
            ...state.innerData,
            objects: objects,
          },
        })),
      setInformationAttributes: (attributes) =>
        set((state) => ({
          innerData: {
            ...state.innerData,
            informationAttributes: attributes,
          },
        })),
      setSelectedObjectId: (objectId?) => set({ selectedObjectId: objectId }),
      getObjects: () => get().innerData.objects,
      getObjectById: (objectId: string) => {
        const { innerData } = get();
        return innerData.objects.find((obj) => obj.objectId === objectId);
      },
      getSelectedObject: () => {
        const { innerData, selectedObjectId } = get();
        return innerData.objects.find(
          (obj) => obj.objectId === selectedObjectId,
        );
      },
    }),
    { name: 'mapDataStorage' },
  ),
);

export default useMapInfoStore;
