import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MapInfo } from '../types/MapInfo';

interface State {
  mapId: number;
  mapTitle: string;
  mapDescription: string;
  location: string;
  latitude: number;
  longitude: number;
  isPublished: boolean;
  isMine: boolean;
  isBookmarked: boolean;
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
      latitude: 0.0,
      longitude: 0.0,
      isPublished: false,
      isMine: false,
      isBookmarked: false,
      setMapInfo: (mapInfo) =>
        set({
          mapId: mapInfo.id,
          mapTitle: mapInfo.title,
          mapDescription: mapInfo.description,
          location: mapInfo.location,
          latitude: mapInfo.latitude,
          longitude: mapInfo.longitude,
          isPublished: mapInfo.isPublished,
          isMine: mapInfo.isMine,
          isBookmarked: mapInfo && mapInfo.isBookmarked,
        }),
      setTitle: (title) => set({ mapTitle: title }),
      setDescription: (description) => set({ mapDescription: description }),
      togglePublish: () =>
        set((state) => {
          return { isPublished: !state.isPublished };
        }),
      switchIsBookmarked: () =>
        set((state) => {
          return { isBookmarked: !state.isBookmarked };
        }),
    }),
    { name: 'registerStatusStorage' },
  ),
);

export default useMapInfoStore;
