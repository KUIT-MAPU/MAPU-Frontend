import { useMutation, useQueryClient } from "react-query";
import { unFollow } from "./unFollow";
import { FollowType } from "../../types/follow/FollowType";

export const useDeleteUnFollow = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (follow: FollowType) => {
      console.log(follow)
      return await unFollow(follow)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey : ['unfollowData']});
    },
    onError: (error :Error) => {
      console.log('Unfollow request failed', error);
    },
  });
  
  return mutation;
}