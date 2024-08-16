import { keywordMap } from "./keywordMap";

export const getKeywordMap = async (keyword: string) => {
  try {
    const response = await keywordMap(keyword);
    console.log(response)
    return response;
  } catch (error) {
    console.error('Error fetching keyword map:', error);
    return undefined;
  }
};