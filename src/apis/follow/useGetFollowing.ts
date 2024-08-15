import { getFollowing } from "./getFollowing";
import { FollowingType } from "../../types/follow/FollowingType";

export const  fetchFollowing = async (token:string| undefined): Promise<FollowingType | never[]> => {
  try {
    if(token) {
      return await getFollowing();
    } else {
      console.error('Error fetching data.');
      throw new Error('토큰이 필요함.')
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('정보를 불러올 수 없음.');
  }
}