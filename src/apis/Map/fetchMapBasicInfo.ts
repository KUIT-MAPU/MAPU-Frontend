import { useQuery } from 'react-query';
import instance from '../instance';
import { BaseResponse } from '../../types/BaseResponse';
import { MapBasicInfo } from '../../types/map/MapBasicInfo';
import { MapMode } from '../../types/enum/MapMode';

export const fetchMapBasicInfo = async (id: number) => {
  const response = await instance.get<BaseResponse<MapBasicInfo>>(
    `/map/${id}/basic-info/edit`,
  );
  return response.data;
};

export const fetchMapBasicInfoForViewer = async (id: number) => {
  const response = await instance.get<BaseResponse<MapBasicInfo>>(
    `/map/${id}/basic-info/view`,
  );
  return response.data;
};

export const useMapBasicInfoQuery = (id: number, mapMode: MapMode) => {
  const { data: mapBasicInfo, isLoading: isMapBasicInfoLoading } = useQuery({
    queryKey: ['fetchMapBasicInfo'],

    queryFn: () => {
      if (mapMode === MapMode.EDIT) return fetchMapBasicInfo(id);
      if (mapMode === MapMode.VIEW) return fetchMapBasicInfoForViewer(id);
    },
  });

  return { mapBasicInfo, isMapBasicInfoLoading };
};
