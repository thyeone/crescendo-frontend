import studyApi from '@apis/study/studyApi';
import {
  useSuspenseQuery,
  useSuspenseInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';

export const useGetStudyGroupList = (params = '') => {
  return useSuspenseInfiniteQuery({
    queryKey: ['useGetStudyGroupList', params],
    queryFn: ({ pageParam }) => {
      const cursor = params
        ? pageParam
          ? `?${params}` + `&${pageParam}`
          : `?${params}`
        : `?${pageParam}`;
      return studyApi.getStudyGroupList(cursor);
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => {
      return lastPage.next ? lastPage.next.split('?')[1] : undefined;
    },
  });
};

export const useGetRandomStudyGroupList = () => {
  return useQuery({
    queryKey: ['useGetRandomStudyGroupList'],
    queryFn: () => studyApi.getStudyGroupList('?random=true'),
  });
};

export const useGetStudyDetail = (id: string) => {
  return useSuspenseQuery({
    queryKey: ['useGetStudyDetail', id],
    queryFn: () => studyApi.getStudyDetail(id),
    staleTime: 5 * 60 * 1000,
  });
};

// enabled 옵션을 사용하기 위한 훅입니다.
export const useGetStudyDetailInStudyForm = (id: string) => {
  return useQuery({
    queryKey: ['useGetStudyDetail', id],
    queryFn: () => studyApi.getStudyDetail(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
};
