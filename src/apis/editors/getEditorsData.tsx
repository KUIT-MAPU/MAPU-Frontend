import instance from "../instance";
import { EditorType } from "../../types/editors/EditorType";
import { BaseResponse } from "../../types/BaseResponse";

export const getEditorDataWithToken = async () => {
  try {
    const response = await instance.get<BaseResponse<EditorType[]>>('/home/editor');
    console.log('Data with Token:', response.data);
    return response.data.result || [];
  } catch (error) {
    console.error('Error fetching data without token:', error);
    return [];
  }
};

export const getEditorDataWithoutToken = async () => {
  try {
    const response =
      await instance.get<BaseResponse<EditorType[]>>('/home/editor');
    console.log('Data without Token:', response.data);
    return response.data.result || [];
  } catch (error) {
    console.error('Error fetching data without token:', error);
    return [];
  }
};
