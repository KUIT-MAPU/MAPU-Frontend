import { useMutation } from 'react-query';
import instance from '../instance';
import { BaseResponse } from '../../types/BaseResponse';
import { LoginSuccess } from '../../types/auth/login';
import { ResponseCode } from '../../types/enum/ResponseCode';
import useRegisterStore from '../../stores/registerStore';
import { useNavigate } from 'react-router-dom';

export const useLogOutMutation = (prevUrl: string) => {
  const { resetStatus } = useRegisterStore();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      return await instance.post<BaseResponse<LoginSuccess>>(`/logout`);
    },
    onSuccess: (response) => {
      const respone = response.data;

      if (respone.code === ResponseCode.SUCCESS) {
        resetStatus();
      }
      navigate(prevUrl);
    },
    onError: () => {
      console.log('로그아웃 실패');
      navigate(prevUrl);
    },
  });

  return mutation;
};

export default useLogOutMutation;
