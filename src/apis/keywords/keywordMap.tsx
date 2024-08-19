import instance from "../instance";
import { APIKeywordMapType } from "../../types/keywords/APIKeywordMapType";
import { BaseResponse } from "../../types/BaseResponse";
import { KeywordType } from "../../types/keywords/KeywordType";
import { MapsType } from "../../types/keywords/MapsType";

export const keywordMap = async (keyword:string) => {
  try {
    const response = await instance.get<BaseResponse<APIKeywordMapType[] | undefined>>(`home/map/keyword`, {
      params: { keyword }
    })

    const results = response.data.result?.map((item) => {
      const newKeyword:KeywordType = {
        id: Math.random(),
        title: keyword,
        selected:false,
      }

      const newMaps: MapsType[] = item.maps.map((map) => {
        const keywords: KeywordType[] = map.mapKeywords.map((title, index) => ({
          id: index,
          title: title,
          selected: false,
        }));
        
        return {
          ...map,
          mapKeywords: keywords,
        };
      });
      
      return {
        keyword: newKeyword,
        maps: newMaps,
      };
    });

    return results;
  }catch(error) {
    console.error('Error fetching data:', error);
    return undefined;
  }
}