import instance from "../instance";
import { APIKeywordMapType } from "../../types/keywords/APIKeywordMapType";
import { BaseResponse } from "../../types/BaseResponse";

export const keywordMap = async (keyword:string) => {
  try {
    const response = await instance.get<BaseResponse<APIKeywordMapType[] | undefined>>(`home/map/keyword`, {
      params: { keyword }
    })
    return response.data.result;
  }catch(error) {
    console.error('Error fetching data:', error);
    return undefined;
  }
}