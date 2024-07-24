export const ObjectShape = {
  POINT: '점',
  LINE: '선',
  PLANE: '면',
} as const;

export type ObjectShape = (typeof ObjectShape)[keyof typeof ObjectShape];
