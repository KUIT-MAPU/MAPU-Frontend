import { create } from 'zustand';

interface userViewState {
    viewUserData: {
        nickname: string;
        profileId: string;
        imgUrl: string;
        mapCnt: number;
        followerCnt: number;
        followingCnt: number;
    };
    resetViewUserData: () => void;
    setViewUserData: (data: userViewState['viewUserData']) => void;
}

export const useUserViewState = create<userViewState>((set) => ({
    viewUserData: {
        nickname: '',
        profileId: '',
        imgUrl: '',
        mapCnt: 0,
        followerCnt: 0,
        followingCnt: 0,
    },
    resetViewUserData: () => set({ viewUserData: {
        nickname: '',
        profileId: '',
        imgUrl: '',
        mapCnt: 0,
        followerCnt: 0,
        followingCnt: 0,
    } }),
    setViewUserData: (data) => set({ viewUserData: data }),
}));

export default useUserViewState;