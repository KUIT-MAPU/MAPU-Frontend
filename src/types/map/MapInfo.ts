export interface MapInfo {
  id: number;
  title: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  isPublished: boolean;
  publicLink?: string;
  isMine: boolean;
  isBookmarked?: boolean;
}
