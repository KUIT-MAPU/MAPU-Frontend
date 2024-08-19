import { useMutation, useQueryClient } from 'react-query';
import instance from '../instance';

const useMapBookmarkEditMutation = (id: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (status: boolean) => {
      if (status) {
        const response = await instance.post(`/map/${id}/bookmark`);
        return response.data;
      }
      const response = await instance.delete(`/map/${id}/bookmark`);
      return response.data;
    },

    onSuccess: () => {
      console.log('북마크 여부 설정 성공!');
      queryClient.invalidateQueries({
        queryKey: ['useMapBasicInfoQuery'],
      });
    },
  });

  return mutation;
};

export default useMapBookmarkEditMutation;
