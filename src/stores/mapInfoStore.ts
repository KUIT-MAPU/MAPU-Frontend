import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MapInfo } from '../types/MapInfo';

interface State {
  mapId: number;
  mapTitle: string;
  mapDescription: string;
  location: string;
  centerLatitude: number;
  centerLongitude: number;
  isPublished: boolean;
  isMine: boolean;
  amIEditor?: boolean;
  isBookmarked?: boolean;
  setMapInfo: (mapInfo: MapInfo) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  togglePublish: () => void;
  switchIsBookmarked: () => void;
}

const useMapInfoStore = create(
  persist<State>(
    (set) => ({
      mapId: 1,
      mapTitle: '건대 맛집 지도',
      mapDescription: '',
      location: '',
      centerLatitude: 0.0,
      centerLongitude: 0.0,
      isPublished: false,
      isMine: false,
      amIEditor: true,
      setMapInfo: (mapInfo) =>
        set({
          mapId: mapInfo.id,
          mapTitle: mapInfo.title,
          mapDescription: mapInfo.description,
          location: mapInfo.location,
          centerLatitude: mapInfo.latitude,
          centerLongitude: mapInfo.longitude,
          isPublished: mapInfo.isPublished,
          isMine: mapInfo.isMine,
          amIEditor: mapInfo.isMine && mapInfo.amIEditor,
          isBookmarked: mapInfo.isMine && mapInfo.isBookmarked,
        }),
      setTitle: (title) => set({ mapTitle: title }),
      setDescription: (description) => set({ mapDescription: description }),
      togglePublish: () =>
        set((state) => {
          return { ...state, isPublished: !state.isPublished };
        }),
      switchIsBookmarked: () =>
        set((state) => {
          return { ...state, isBookmarked: !state.isBookmarked };
        }),
    }),
    { name: 'mapInfoStorage' },
  ),
);

export default useMapInfoStore;
