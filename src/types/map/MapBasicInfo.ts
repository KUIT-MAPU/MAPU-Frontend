import { UserType } from '../mapData/UserType';

export interface MapBasicInfo {
  mapId: number;
  title: string;
  address: string;
  description: string;
  latitude: number;
  longitude: number;
  published: boolean;
  mine: boolean;
  bookmarked: boolean;
  owner: UserType;
}
