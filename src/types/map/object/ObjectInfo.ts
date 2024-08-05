import { ObjectShape } from '../../enum/ObjectShape';
import { ObjectOutline } from './ObjectOutline';
import { StarRating } from './StarRating';

export interface ObjectInfo {
  shape: ObjectShape;
  name: string;
  roadNameAddress: string;
  detailAddress: string;
  length?: string; //길이 - 선
  perimeter?: string; //둘레 - 면
  area?: string; //면적 - 면
  connections: ObjectOutline[];
  tags: string[]; // 최대 10글자
  starRatings: StarRating[];
}
