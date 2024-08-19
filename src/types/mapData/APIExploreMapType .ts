import { UserType } from '../UserType';

export interface APIExploreMapType {
  mapId: number;
  imageUrl: string;
  title: string;
  region: string;
  description: string;
  user: UserType;
  keyword: string[];
}
