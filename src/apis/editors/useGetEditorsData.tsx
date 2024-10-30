import { getEditorDataWithToken, getEditorDataWithoutToken } from "./getEditorsData";
import { EditorType } from "../../types/editors/EditorType";

export const fetchEditorData = async (
  token: string | undefined,
): Promise<EditorType[]> => {
  try {
    if (token) {
      return await getEditorDataWithToken();
    } else {
      return await getEditorDataWithoutToken();
    }
  } catch (error) {
    console.error('Error fetching editor data:', error);
    throw new Error('정보를 불러올 수 없음.');
  }
};
