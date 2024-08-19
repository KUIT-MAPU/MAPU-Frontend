import { searchMap } from "./searchMap";

export const getSearchMap = async (searchType:string, searchWord:string,size: number, page:number) => {
  try{
    const response = await searchMap(searchType,searchWord,size,page);
    return response;
  } catch (error) {
    console.error('Error fetching random map:',error);
    return undefined;
  }
}