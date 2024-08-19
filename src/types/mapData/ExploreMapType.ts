import { UserType } from "../UserType";
import { KeywordType } from "../keywords/KeywordType";

export interface ExploreMapType {
  mapId: number;
  imageUrl: string;
  title: string;
  region : string;
  description: string;
  user : UserType;
  keyword: KeywordType[];
}
