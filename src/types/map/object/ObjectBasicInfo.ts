import { ObjectShape } from '../../enum/ObjectShape';

export interface ObjectBasicInfo {
  shape: ObjectShape;
  name: string;
  roadNameAddress: string;
  detailAddress: string;
  length?: string; //길이 - 선
  perimeter?: string; //둘레 - 면
  area?: string; //면적 - 면
}
