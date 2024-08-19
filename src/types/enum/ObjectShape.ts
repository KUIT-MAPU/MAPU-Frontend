export const ObjectShape = {
  POINT: 'marker',
  LINE: 'polyline',
  PLANE: 'polygon',
} as const;

export type ObjectShape = (typeof ObjectShape)[keyof typeof ObjectShape];
