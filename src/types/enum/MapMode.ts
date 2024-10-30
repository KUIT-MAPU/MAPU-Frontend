export const MapMode = {
  EDIT: 'edit',
  VIEW: 'view',
  UNVALID: 'unvalid',
} as const;

export type MapMode = (typeof MapMode)[keyof typeof MapMode];
