import { useQuery } from 'react-query';
import { getKeyword } from './getKeywords';
import { KeywordType } from '../../types/keywords/KeywordType';
import { useAllKeywordStore } from '../../stores/keywordStore';
import { useEffect } from 'react';

export const useGetKeywords = () => {
  const { setAllKeywordList, allKeywordList } = useAllKeywordStore();
  
  // 페이지 이동 시 재요청 방지를 위해 enabled를 false로 설정
  const { data, isSuccess, refetch } = useQuery<KeywordType[]>('keywordsData', getKeyword, {
    refetchOnWindowFocus: false,
    enabled: false, // 자동으로 데이터 요청 안 함
  });

  // 처음 로드 시 refetch를 호출하여 데이터를 가져옴
  useEffect(() => {
    if (allKeywordList.length === 0) {
      refetch();
    }
  }, [refetch, allKeywordList]);

  useEffect(() => {
    if (isSuccess && data) {
      setAllKeywordList(data);
    }
  }, [isSuccess, data, setAllKeywordList]);

  return { allKeywordList, refetch };
};
