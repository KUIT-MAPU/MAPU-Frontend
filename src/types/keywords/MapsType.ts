import { KeywordType } from "./KeywordType";

export interface MapsType {
  nickname: string;
  profileId: string;
  userImage: string;
  mapId: number;
  mapTitle: string;
  mapImage: string;
  madDescription:string;
  mapAddress:string;
  mapKeywords:KeywordType[]
}
