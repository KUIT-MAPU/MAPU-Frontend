import { getFollowing } from "./getFollowing";
import { FollowingType } from "../../types/follow/FollowingType";

export const  fetchFollowing = async (token:string| undefined): Promise<FollowingType | undefined> => {
  try {
    if(token) {
      const result = await getFollowing();
      console.log(result)
      return result;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('정보를 불러올 수 없음.');
  }
}