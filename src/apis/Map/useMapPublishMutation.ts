import { useMutation, useQueryClient } from 'react-query';
import instance from '../instance';

const useMapPublishMutation = (id: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      // patch 사용
      const response = await instance.patch(`/map/${id}/publish`);
      return response.data;
    },

    onSuccess: () => {
      console.log('지도 게시 여부 수정 성공!');
      queryClient.invalidateQueries({
        queryKey: ['useMapBasicInfoQuery'],
      });
    },
  });

  return mutation;
};

export default useMapPublishMutation;
