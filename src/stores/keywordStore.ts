import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { KeywordType } from '../types/KeywordType';

interface KeywordStore {
  selectedList: KeywordType[];
  setSelectedList: (selectedList: KeywordType[]) => void;
}

const useKeywordStore = create<KeywordStore>()(
  persist(
    (set) => ({
      selectedList: [],
      setSelectedList: (selectedList: KeywordType[]) => set({ selectedList }),
    }),
    {
      name: 'keyword-store',
      getStorage: () => localStorage,
    },
  ),
);

export default useKeywordStore;
