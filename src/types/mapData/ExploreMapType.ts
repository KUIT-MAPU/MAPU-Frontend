import { KeywordType } from '../keywords/KeywordType';
import { UserType } from '../UserType';

export interface ExploreMapType {
  mapId: number;
  imageUrl: string;
  title: string;
  region: string;
  description: string;
  user: UserType;
  keyword: KeywordType[];
}
