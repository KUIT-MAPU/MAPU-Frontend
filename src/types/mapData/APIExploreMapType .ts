import { UserType } from "../UserType";
import { KeywordType } from "../keywords/KeywordType";

export interface APIExploreMapType {
  mapId: number;
  imageUrl: string;
  title: string;
  region : string;
  description: string;
  user : UserType;
  keyword:string[];
}
