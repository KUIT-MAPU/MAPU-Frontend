import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RegisterStatus } from '../types/enum/RegisterStatus';

interface State {
  registerStatus: RegisterStatus;
  profileId: string;
  profileImgUrl: string;
  accessToken: string;
  refreshToken: string;
  loginNeeded: boolean;
  setRegisterStatus: (status: RegisterStatus) => void; //미로그인/회원가입 상태 세팅
  setLogIn: (
    profileId: string,
    profileImgUrl: string,
    accessToken: string,
    refreshToken: string,
  ) => void;
  resetStatus: () => void; //로그인 필요한 상태로 초기화 - 로그아웃으로 사용 가능
  setProfileId: (profileId: string) => void;
  setProfileImg: (profileImgUrl: string) => void;
  setAccessToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setLoginNeeded: (status: boolean) => void;
}

const useRegisterStore = create(
  persist<State>(
    (set) => ({
      registerStatus: RegisterStatus.NEED_LOG_IN,
      profileId: '',
      profileImgUrl: '',
      accessToken: '',
      refreshToken: '',
      loginNeeded: false,
      setRegisterStatus: (status) => set(() => ({ registerStatus: status })),
      setLogIn: (profileId, profileImgUrl, accessToken, refreshToken) => {
        set({
          registerStatus: RegisterStatus.LOG_IN,
          profileId: profileId,
          profileImgUrl: profileImgUrl,
          accessToken: accessToken,
          refreshToken: refreshToken,
          loginNeeded: false,
          //TODO: 회원가입 여부에 따라 분기 처리해야 함
        });
      },
      resetStatus: () => {
        resetStorage();
        set({
          registerStatus: RegisterStatus.NEED_LOG_IN,
          accessToken: '',
          refreshToken: '',
          // loginNeeded: false,
        });
      },
      setProfileId: (profileId) => {
        set({ profileId: profileId });
      },
      setProfileImg: (profileImgUrl) => {
        set({ profileImgUrl: profileImgUrl });
      },
      setAccessToken: (token) => {
        set({ accessToken: token });
      },
      setRefreshToken: (token) => {
        set({ refreshToken: token });
      },
      setLoginNeeded: (status) => {
        set({ loginNeeded: status });
      },
    }),
    { name: 'registerStatusStorage' },
  ),
);

const resetStorage = () => useRegisterStore.persist.clearStorage();

export default useRegisterStore;
