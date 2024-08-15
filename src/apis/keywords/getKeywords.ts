import instance from "../instance";
import { BaseResponse } from "../../types/BaseResponse";

export const getKeyword = async () => {
  try {
    const response = await instance.get<BaseResponse<string[]>>('home/keyword');
    console.log('keywords:',response.data)
    const keywords = response.data.result || [];

    return keywords.map((title, index) => ({
      id: Math.random(),
      title: title,
      selected: false,
    }))

  } catch (error) {
    console.error('Error fetching data;',error);
    return [];
  }
}