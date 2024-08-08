import { useQuery } from 'react-query';
import instance from '../instance';
import { BaseResponse } from '../../types/BaseResponse';

export const kakaoLogin = async (code: string) => {
  console.log('kakaoLogin');
  const response = await instance.get<BaseResponse>('/user/signin/kakao', {
    params: {
      code: code,
      timeout: 5000,
    },
  });
  console.log(response);
  console.log(response.data);
  return response.data;
};

export const googleLogin = async (code: string) => {
  console.log('googleLogin');
  const response = await instance.get<BaseResponse>('/user/signin/google', {
    params: {
      code: code,
      timeout: 5000,
    },
  });
  console.log(response);
  console.log(response.data);
  return response.data;
};

export const useKakaoUserDataQuery = (code: string) => {
  const { data: kakaoUserData, isLoading: isKakaoUserDataLoading } = useQuery({
    queryKey: ['kakaoLogin'],

    // 쿼리 함수를 설정. 이 함수는 API 호출을 담당하며, 여기서는 fetchFeedsData 함수를 호출
    queryFn: () => kakaoLogin(code),
  });

  return { kakaoUserData, isKakaoUserDataLoading };
};

export const useGoogleUserDataQuery = (code: string) => {
  const { data: googleUserData, isLoading: isGoogleUserDataLoading } = useQuery(
    {
      queryKey: ['googleLogin'],

      // 쿼리 함수를 설정. 이 함수는 API 호출을 담당하며, 여기서는 fetchFeedsData 함수를 호출
      queryFn: () => googleLogin(code),
    },
  );

  return { googleUserData, isGoogleUserDataLoading };
};
