import { create } from 'zustand';
import { RegisterStatus } from '../types/RegisterStatus';

interface State {
  register: RegisterStatus;
  accessToken: string;
  refreshToken: string;
  setStatus: (status: RegisterStatus) => void;
  resetStatus: () => void; //logOut으로 사용 가능
  setAccessToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
}

const useRegisterStore = create<State>((set) => ({
  register: RegisterStatus.NEED_LOG_IN,
  accessToken: '',
  refreshToken: '',
  setStatus: (status) => set((state) => ({ ...state, register: status })),
  resetStatus: () =>
    set({
      register: RegisterStatus.NEED_LOG_IN,
      accessToken: '',
      refreshToken: '',
    }),
  setAccessToken: (token) => set({ accessToken: token }),
  setRefreshToken: (token) => set({ refreshToken: token }),
}));

export default useRegisterStore;
