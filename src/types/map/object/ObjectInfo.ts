import { ObjectShape } from '../../enum/ObjectShape';
import { ObjectPropertyType } from '../../enum/ObjectPropertyType';

export interface MapObject {
  objectId: string;
  type: ObjectShape;
  name: string;
  shape: any;
  geoAttribute: {
    roadNameAddress?: string;
    length?: string; //길이 - 선
    perimeter?: string; //둘레 - 면
    area?: string; //면적 - 면
  };
  userAttribute: {
    detailAddress?: string;
    [attributeID: string]: any;
  };
}

export interface InfoAttribute {
  id: string;
  name: string;
  type: ObjectPropertyType;
}

export interface YorkieDocType {
  informationAttributes: InfoAttribute[];
  objects: MapObject[];
}
