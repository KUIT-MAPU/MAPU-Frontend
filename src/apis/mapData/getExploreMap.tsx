import { exploreMap } from "./exploreMap";

export const getExploreMap = async(searchType:string, size: number, page:number) => {
  try{
    const response = await exploreMap(searchType,size,page);
    return response;
  } catch (error) {
    console.error('Error fetching random map:',error);
    return undefined;
  }
}