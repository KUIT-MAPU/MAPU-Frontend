import instance from "../instance";
import { FollowingMapType } from "../../types/mapData/FollowingMapType";
import { BaseResponse } from "../../types/BaseResponse";

export const followingMap = async () => {
  try {
    const response = await instance.get<BaseResponse<FollowingMapType[] | undefined>>('/home/map');
    console.log(response)
    return response.data.result;
  } catch (error) {
    console.error('Error fetching data:',error);
    return undefined;
  }
}