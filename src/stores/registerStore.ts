import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RegisterStatus } from '../types/enum/RegisterStatus';

interface State {
  registerStatus: RegisterStatus;
  loginNeeded: boolean;
  profileId?: string;
  profileImgUrl?: string;
  accessToken?: string;
  isIdDuplicate: boolean;
  setLogIn: (profileId: string, imgUrl: string, accessToken: string) => void;
  resetStatus: () => void; //로그인 필요한 상태로 초기화 - 로그아웃으로 사용 가능ㅋ
  setRegisterStatus: (status: RegisterStatus) => void; //미로그인/회원가입 상태 세팅
  setLoginNeededStatus: (status: boolean) => void;
  setIsIdDuplicate: (status: boolean) => void;
  setAccessToken: (accessToken: string) => void; //새로운 액세스 토큰 설정
  clearAccessToken: () => void; //액세스 토큰 초기화
}

const useRegisterStore = create(
  persist<State>(
    (set) => ({
      registerStatus: RegisterStatus.NEED_LOG_IN,
      loginNeeded: false,
      isIdDuplicate: false,
      setLogIn: (profileId, imgUrl, accessToken) =>
        set({
          registerStatus: RegisterStatus.LOG_IN,
          profileId: profileId,
          profileImgUrl: imgUrl,
          accessToken: accessToken,
          isIdDuplicate: false,
        }),
      setRegisterStatus: (status) => set(() => ({ registerStatus: status })),
      resetStatus: () => {
        resetStorage();
        set({
          registerStatus: RegisterStatus.NEED_LOG_IN,
          profileId: '',
          profileImgUrl: '',
          accessToken: '',
          loginNeeded: false,
          isIdDuplicate: false,
        });
      },
      setLoginNeededStatus: (status) => {
        set({ loginNeeded: status });
      },
      setIsIdDuplicate: (status) => {
        set({ isIdDuplicate: status });
      },
      setAccessToken: (accessToken) => {
        set({ accessToken: accessToken });
      },
      clearAccessToken: () => {
        set({ accessToken: undefined });
      },
    }),
    { name: 'registerStatusStorage' },
  ),
);

const resetStorage = () => useRegisterStore.persist.clearStorage();

export default useRegisterStore;
