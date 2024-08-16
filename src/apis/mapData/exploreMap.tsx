import instance from "../instance";
import { ExploreMapType } from "../../types/mapData/ExploreMapType";
import { BaseResponse } from "../../types/BaseResponse";
import { KeywordType } from "../../types/keywords/KeywordType";
import { APIExploreMapType } from "../../types/mapData/APIExploreMapType ";

export const exploreMap = async (searchType:string, size: number, page:number) => {
  try {
    const response = await instance.get<BaseResponse<APIExploreMapType[] | undefined>> (`/map/search`, {
      params: {
        searchType,
        size,
        page
      }
    })

    const results = response.data.result?.map((item) => {
      const newKeyword : KeywordType[]= item.keyword.map((title: string, index) => ({
        id: index,
        title: title,
        selected: false,
      }));
      console.log('newKeyword:', newKeyword);

      return {
        ...item,
        keyword: newKeyword,
      };
    });
    
    return results;
  } catch(error) {
    console.error('Error fetchgin data:',error);
    return undefined;
  }
}