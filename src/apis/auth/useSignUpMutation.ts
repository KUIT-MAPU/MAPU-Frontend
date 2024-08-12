import { useMutation } from 'react-query';
import instance from '../instance';
import { BaseResponse } from '../../types/BaseResponse';
import { LoginSuccess } from '../../types/auth/login';
import { ResponseCode } from '../../types/enum/ResponseCode';
import useRegisterStore from '../../stores/registerStore';
import { useNavigate } from 'react-router-dom';

export const useSignUpMutation = (prevUrl: string) => {
  const { setLogIn } = useRegisterStore();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      return await instance.post<BaseResponse<LoginSuccess>>(
        `/user/singup`,
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
    },
    onSuccess: (response) => {
      const respone = response.data;

      if (respone.code === ResponseCode.LOGGED_IN) {
        console.log('새로운 사용자, 회원가입 성공!');

        const profileId = respone.result.profileId;
        const imgUrl = respone.result.imgUrl;
        const accessToken = respone.result.accessToken;
        setLogIn(profileId, imgUrl, accessToken);

        instance.defaults.headers.common['Authorization'] =
          `Bearer ${accessToken}`; //로그인 된 유저에 대하여 모든 api 호출에 accesstoken 포함시키는 코드
      } else {
        //TODO: 회원가입 오류
      }

      if (prevUrl === '/') navigate('/timeline');
      else navigate(prevUrl);
    },
    onError: () => {
      console.log('회원가입 실패');
      navigate(prevUrl);
    },
  });

  return mutation;
};

export default useSignUpMutation;
