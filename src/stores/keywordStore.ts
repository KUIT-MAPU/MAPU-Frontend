import { create } from "zustand";
import { KeywordType } from "../types/KeywordType";

interface KeywordStore {
  selectedList: KeywordType[];
  setSelectedList: (selectedList: KeywordType[]) => void;
}

const useKeywordStore = create<KeywordStore>((set) => ({
  selectedList: [] ,
  setSelectedList: (selectedList: KeywordType[]) => set({ selectedList }),
}));

export default useKeywordStore;