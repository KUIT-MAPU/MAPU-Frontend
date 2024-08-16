import instance from "../instance";
import { KeywordMapType } from "../../types/keywords/KeywordMapType";
import { BaseResponse } from "../../types/BaseResponse";

export const keywordMap = async (keyword:string) => {
  try {
    const response = await instance.get<BaseResponse<KeywordMapType[] | undefined>>(`/map/keyword`, {
      params: { keyword }
    })
    return response.data.result;
  }catch(error) {
    console.error('Error fetching data:', error);
    return undefined;
  }
}