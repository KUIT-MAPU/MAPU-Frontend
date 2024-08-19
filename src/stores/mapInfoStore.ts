import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MapInfo } from '../types/map/MapInfo';
import { ObjectOutline } from '../types/map/object/ObjectOutline';
import { ObjectShape } from '../types/enum/ObjectShape';

interface State {
  mapId: number;
  publicLink: string;
  objectOutlineList: ObjectOutline[];
}

const useMapInfoStore = create(
  persist<State>(
    (set) => ({
      mapId: 1,
      publicLink: 'mapu-frontend.vercel.app/map/2/view',
      objectOutlineList: [
        {
          objectId: 1,
          shape: ObjectShape.POINT,
          name: '용용선생',
          roadNameAddress: '광진구 능동로 120',
        },
        {
          objectId: 2,
          shape: ObjectShape.LINE,
          name: '식후 건대 호수 한 바퀴',
          roadNameAddress: '광진구 능동로 120',
        },
        {
          objectId: 3,
          shape: ObjectShape.LINE,
          name: '건대에서 어대까지',
          roadNameAddress: '광진구 능동로 120',
        },
        {
          objectId: 4,
          shape: ObjectShape.PLANE,
          name: '중국집 거리',
          roadNameAddress: '광진구 능동로 120',
        },
        {
          objectId: 11,
          shape: ObjectShape.POINT,
          name: '용용선생',
          roadNameAddress: '광진구 능동로 120',
        },
        {
          objectId: 21,
          shape: ObjectShape.LINE,
          name: '식후 건대 호수 한 바퀴',
          roadNameAddress: '광진구 능동로 120',
        },
        {
          objectId: 31,
          shape: ObjectShape.LINE,
          name: '건대에서 어대까지',
          roadNameAddress: '광진구 능동로 120',
        },
        {
          objectId: 41,
          shape: ObjectShape.PLANE,
          name: '중국집 거리',
          roadNameAddress: '광진구 능동로 120',
        },
        {
          objectId: 12,
          shape: ObjectShape.POINT,
          name: '용용선생',
          roadNameAddress: '광진구 능동로 120',
        },
        {
          objectId: 22,
          shape: ObjectShape.LINE,
          name: '식후 건대 호수 한 바퀴',
          roadNameAddress: '광진구 능동로 120',
        },
        {
          objectId: 32,
          shape: ObjectShape.LINE,
          name: '건대에서 어대까지',
          roadNameAddress: '광진구 능동로 120',
        },
        {
          objectId: 42,
          shape: ObjectShape.PLANE,
          name: '중국집 거리',
          roadNameAddress: '광진구 능동로 120',
        },
      ],
    }),
    { name: 'mapInfoStorage' },
  ),
);

export default useMapInfoStore;
