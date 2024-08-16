import { create } from 'zustand';
import { StateStorage, persist, createJSONStorage } from 'zustand/middleware';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { KeywordType } from '../types/KeywordType';

const cookieStorage: StateStorage = {
  getItem: (name: string) => {
    const cookie = getCookie(name);
    return cookie ? JSON.parse(cookie) : null;
  },
  setItem: (name: string, value: string) => {
    setCookie(name, value, { path: '/' });
  },
  removeItem: (name: string) => {
    removeCookie(name);
  },
};

interface KeywordStore {
  selectedList: KeywordType[];
  setSelectedList: (selectedList: KeywordType[]) => void;
  removeSelectedList: () => void;
}

const useKeywordStore = create<KeywordStore>()(
  persist(
    (set) => ({
      selectedList: [],
      setSelectedList: (selectedList: KeywordType[]) => {
        set({ selectedList });
        cookieStorage.setItem('keyword-store', JSON.stringify(selectedList));
      },
      removeSelectedList: () => {
        set({ selectedList: [] });
        cookieStorage.removeItem('keyword-store');
      },
    }),
    {
      name: 'keyword-store',
      storage: createJSONStorage(() => cookieStorage),
    },
  ),
);

interface AllKeywordStore {
  allKeywordList: KeywordType[];
  setAllKeywordList: (allKeywordList: KeywordType[]) => void;
}

const useAllKeywordStore = create<AllKeywordStore>()(
  persist(
    (set) => ({
      allKeywordList: [],
      setAllKeywordList: (allKeywordList: KeywordType[]) => {
        set({ allKeywordList });
        cookieStorage.setItem(
          'all-keyword-store',
          JSON.stringify(allKeywordList),
        );
      },
    }),
    {
      name: 'all-keyword-store',
      storage: createJSONStorage(() => cookieStorage),
    },
  ),
);

export { useKeywordStore, useAllKeywordStore };
