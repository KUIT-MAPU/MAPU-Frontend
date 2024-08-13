import { useQuery } from 'react-query';
import instance from '../instance';
import { BaseResponse } from '../../types/BaseResponse';
import { LoginSuccess } from '../../types/auth/login';

export const socialLogin = async (social: string, code: string) => {
  const response = await instance.post<BaseResponse<LoginSuccess>>(
    `/user/signin`,
    {
      socialType: social,
      code: code,
    },
  );
  return response.data;
};

export const useLogInDataQuery = (social: string, code: string) => {
  const { data: loginData, isLoading: isLoginDataLoading } = useQuery({
    queryKey: ['socialLogin'],

    // 쿼리 함수를 설정. 이 함수는 API 호출을 담당하며, 여기서는 fetchFeedsData 함수를 호출
    queryFn: () => socialLogin(social, code),
  });

  return { loginData, isLoginDataLoading };
};
