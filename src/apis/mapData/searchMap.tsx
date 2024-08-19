import instance from "../instance";
import { BaseResponse } from "../../types/BaseResponse";
import { APIExploreMapType } from "../../types/mapData/APIExploreMapType ";
import { KeywordType } from "../../types/keywords/KeywordType";

export const searchMap = async (searchType: string, searchWord:string,size:number,page:number) => {
  try {
    const response = await instance.get<BaseResponse<APIExploreMapType[] | undefined>> (`/map/search`, {
      params: {
        searchType,
        searchWord,
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