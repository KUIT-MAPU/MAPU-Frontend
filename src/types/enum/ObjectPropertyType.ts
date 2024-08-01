export const ObjectPropertyType = {
  CONNECTION: '객체 연결',
  TAG: '태그',
  STAR_RATING: '별점',
} as const;

export type ObjectPropertyType =
  (typeof ObjectPropertyType)[keyof typeof ObjectPropertyType];
