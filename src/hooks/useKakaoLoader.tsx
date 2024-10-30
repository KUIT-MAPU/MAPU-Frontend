import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

export default function useKakaoLoader() {
  const apiKey = process.env.REACT_APP_KAKAOMAP_API_KEY;

  useKakaoLoaderOrigin({
    appkey: apiKey || '',
    libraries: ['clusterer', 'drawing', 'services'],
  });
}
