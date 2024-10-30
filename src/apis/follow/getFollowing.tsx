import instance from "../instance";
import { FollowingType } from "../../types/follow/FollowingType";
import { BaseResponse } from "../../types/BaseResponse";

export const getFollowing = async () => {
  try{
    const response = await instance.get<BaseResponse<FollowingType>>('/following')
    console.log('response', response)
    return response.data.result || undefined
  } catch (error) {
    console.error('Error fetching data');
    return undefined;
  }
}