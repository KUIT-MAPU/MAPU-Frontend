import { useQuery } from 'react-query';
import { getKeyword } from './getKeywords';
import { KeywordType } from '../../types/keywords/KeywordType';
import { useAllKeywordStore } from '../../stores/keywordStore';
import { useKeywordStore } from '../../stores/keywordStore';
import { fetchFollowing } from '../follow/useGetFollowing';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useGetKeywords = (token: string | undefined) => {
  const location = useLocation();
  const { setAllKeywordList, allKeywordList } = useAllKeywordStore();
  const {selectedList, setSelectedList} = useKeywordStore()

  const { data: followingData, isSuccess: isFollowingDataSuccess } = useQuery(
    ['followingData', token],
    () => fetchFollowing(token),
    {
      enabled: !!token,
      refetchOnWindowFocus: false,
    },
  );
  // 페이지 이동 시 재요청 방지를 위해 enabled를 false로 설정
  const { data, isSuccess, refetch } = useQuery<KeywordType[]>(
    'keywordsData',
    getKeyword,
    {
      refetchOnWindowFocus: false,
      enabled: false, // 자동으로 데이터 요청 안 함
    },
  );

  useEffect(() => {
    if (allKeywordList.length === 0) {
      refetch();
    }
  }, [refetch, allKeywordList.length]);

  useEffect(() => {
    if (isSuccess && data && allKeywordList.length === 0) {
      let Keywords = data;

      if (!token && location.pathname === '/timeline') {
        Keywords = data.map((keyword, index) => ({
          ...keyword,
          selected: index < 2 ? true : keyword.selected,
        }));
      } else if (token &&followingData && followingData.users === undefined) {
          Keywords = data.map((keyword, index) => ({
            ...keyword,
            selected: index < 2 ? true : keyword.selected,
          }));
      }

      setAllKeywordList(Keywords);

      // Filter keywords with selected as true and set them to selectedList
      const selectedKeywords = Keywords.filter(keyword => keyword.selected);
      setSelectedList(selectedKeywords);
    }
  }, [isSuccess, data, setAllKeywordList, token, allKeywordList.length]);

  return { allKeywordList, refetch };
};
