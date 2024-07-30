import { MapType } from './MapType';

export interface EditorType {
  id: number;
  userId: string;
  img: string;
  name: string;
  following?: boolean;
  follower?: EditorType[];
  map?: MapType[];
}
