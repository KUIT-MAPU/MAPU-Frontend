import { ObjectShape } from '../../enum/ObjectShape';

export interface EditorObjectBasicInfo {
  shape: ObjectShape;
  roadNameAddress: string;
  length?: string; //길이 - 선
  perimeter?: string; //둘레 - 면
  area?: string; //면적 - 면
}

export interface ViewerObjectBasicInfo {
  shape: ObjectShape;
  name: string;
  roadNameAddress: string;
  detailAddress: string;
  length?: string; //길이 - 선
  perimeter?: string; //둘레 - 면
  area?: string; //면적 - 면
}
