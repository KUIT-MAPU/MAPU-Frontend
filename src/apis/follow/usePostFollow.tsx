import { useMutation, useQueryClient } from 'react-query';
import instance from '../instance';
import { FollowType } from '../../types/follow/FollowType';

export const usePostFollow = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (followData: FollowType) => {
      console.log('Sending request with data:', followData);
      return await instance.post('/follow', followData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followData'] });
    },
    onError: (error: Error) => {
      console.error('Follow request failed:', error);
    },
  });

  return mutation;
};
