import { followingMap } from "./followingMap";
import { FollowingMapType } from "../../types/mapData/FollowingMapType";

export const getFollowingMap = async (token: string | undefined): Promise<FollowingMapType[] | undefined> => {
  try {
    if (!token) {
      return undefined;
    }
    // 여기서 followingMap 함수가 token을 사용하여 데이터를 가져온다고 가정
    const response = await followingMap();
    return response; // 성공적으로 데이터를 반환
  } catch (error) {
    console.error('Error fetching following map data:', error);
    // 오류가 발생한 경우, undefined를 반환
    return undefined;
  }
};