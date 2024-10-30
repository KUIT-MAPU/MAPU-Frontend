import instance from "../instance";
import { FollowType } from "../../types/follow/FollowType";

export const unFollow = async (follow: FollowType): Promise<FollowType> => {
  const { followingId } = follow;

  console.log(follow);
  
  try {
    const result = await instance.delete(`/unfollow`, {
      params: { followingId }
    });

    console.log(result);

    // Axios의 응답 객체에서 실제 데이터를 추출하여 반환
    return result.data as FollowType;

  } catch (error) {
    console.error("Unfollow request failed", error);
    throw error; // 에러가 발생한 경우 상위로 전달
  }
};