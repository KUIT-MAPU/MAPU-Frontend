import axios from 'axios';
import useRegisterStore from '../stores/registerStore';

// axios 인스턴스 생성
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    const accessToken = useRegisterStore().accessToken;
    // console.log(accessToken);

    if (accessToken !== null && accessToken !== '') {
      config.headers['Authorization'] = accessToken;
    }
    console.log('axios config : ', config);
    return config;
  },
  (error) => {
    // 요청 에러 처리
    return Promise.reject(error);
  },
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 응답 에러 처리
    throw new Error(' data error');
  },
);

export default instance;
