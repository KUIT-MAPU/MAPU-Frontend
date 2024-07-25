export interface MapInfo {
  id: number;
  title: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  isPublished: boolean;
  isMine: boolean;
  isBookmarked?: boolean;
}
