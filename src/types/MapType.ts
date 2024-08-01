import { EditorType } from './EditorType';

export interface MapType {
  id: number;
  name: string;
  address: string;
  img: string;
  keywords: string;
  editors: EditorType[];
  discription?:string;
  mapKeyword?: string[];
  owner?:EditorType;
}
