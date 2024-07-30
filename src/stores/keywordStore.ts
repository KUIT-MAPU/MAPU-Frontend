import { create } from 'zustand';
import { StateStorage,persist, createJSONStorage } from 'zustand/middleware';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { KeywordType } from '../types/KeywordType';

const cookieStorage: StateStorage = {
  getItem: (name: string) => {
    const cookie = getCookie(name);
    return cookie ? JSON.parse(cookie) : null;
  },
  setItem: (name: string, value:any) => {
    setCookie(name, JSON.stringify(value), {path:'/'})
  },

  removeItem: (name:string) => {
    removeCookie(name);
  }
}
interface KeywordStore {
  selectedList: KeywordType[];
  setSelectedList: (selectedList: KeywordType[]) => void;
  removeSelectedList: () => void;
}

const useKeywordStore = create<KeywordStore>()(
  persist(
    (set) => ({
      selectedList: [],
      setSelectedList: (selectedList: KeywordType[]) => set({ selectedList }),
      removeSelectedList: () => {
        cookieStorage.removeItem('keyword-store');
        set({ selectedList: [] });
      },
    }),
    {
      name: 'keyword-store',
      storage: createJSONStorage(() => cookieStorage),
    },
  ),
);

export default useKeywordStore;
