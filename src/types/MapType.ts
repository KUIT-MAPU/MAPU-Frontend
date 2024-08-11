import { EditorType } from './EditorType';
import { MapKeywordType } from './MapKeywordType';

export interface MapType {
  id: number;
  name: string;
  address: string;
  img: string;
  keywords: string;
  editors: EditorType[];
  discription?: string;
  mapKeyword?: MapKeywordType[];
  owner?: EditorType;
}
