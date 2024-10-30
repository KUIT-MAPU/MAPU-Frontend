import { ObjectShape } from '../../enum/ObjectShape';

export interface ObjectOutline {
  objectId: number;
  shape: ObjectShape;
  name: string;
  roadNameAddress: string;
}
