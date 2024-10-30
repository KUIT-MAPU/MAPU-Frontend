import { useMutation } from 'react-query';
import instance from '../instance';
import { BaseResponse } from '../../types/BaseResponse';
import { LoginSuccess } from '../../types/auth/login';
import { ResponseCode } from '../../types/enum/ResponseCode';
import useRegisterStore from '../../stores/registerStore';
import { useNavigate } from 'react-router-dom';

export const useSignUpMutation = (prevUrl: string) => {
  const { setLogIn, setIsIdDuplicate } = useRegisterStore();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      return await instance.post<BaseResponse<LoginSuccess>>(
        `/user/signup`,
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
    },
    onSuccess: (response) => {
      const responseData = response.data;

      if (responseData.code === ResponseCode.SUCCESS) {
        console.log('새로운 사용자, 회원가입 성공!');

        const profileId = responseData.result.profileId;
        const imgUrl = responseData.result.imgUrl;
        const accessToken = responseData.result.accessToken;
        setLogIn(profileId, imgUrl, accessToken);

        instance.defaults.headers.common['Authorization'] =
          `Bearer ${accessToken}`; //로그인 된 유저에 대하여 모든 api 호출에 accesstoken 포함시키는 코드

        if (prevUrl === '/') navigate('/timeline');
        else navigate(prevUrl);
        return;
      }
      if (responseData.code === ResponseCode.ALREADY_EXIST_PROFILE_ID) {
        //중복된 profileId인 경우
        console.log('사용 중인 아이디');
        setIsIdDuplicate(true);
        navigate(`${prevUrl + '?authState=signup'}`);
        return;
      } else {
        //회원가입 오류
        console.log('회원가입 실패');
        navigate(`${prevUrl === '/' ? prevUrl : prevUrl + '?authState=login'}`);
        return;
      }
    },
    onError: () => {
      console.log('회원가입 실패');
      navigate(prevUrl);
    },
  });

  return mutation;
};

export default useSignUpMutation;
