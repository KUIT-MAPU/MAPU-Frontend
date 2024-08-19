import { useMutation, useQueryClient } from 'react-query';
import instance from '../instance';

const useMapTitleEditMutation = (id: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (title: string) => {
      // patch 사용
      const response = await instance.patch(`/map/${id}/info/title`, {
        content: title,
      });
      return response.data;
    },

    onSuccess: () => {
      console.log('지도 제목 수정 성공!');
      queryClient.invalidateQueries({ queryKey: ['useMapBasicInfoQuery'] }); // 수정이 성공하면 쿼리를 다시 가져옴
    },
  });

  return mutation;
};

export default useMapTitleEditMutation;
