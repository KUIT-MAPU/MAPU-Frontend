import instance from "../instance";
import { FollowType } from "../../types/follow/FollowType";

export const postFollow = async (newFollow: FollowType): Promise<FollowType> => {
  return await instance.post('/follow', newFollow);
};