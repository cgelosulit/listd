import axios from 'axios';
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import { Configs } from '@/constants/Configs';
import { cleanObject } from '@/utils/clean-object';
import { Property, PropertyListingSearchQuery } from '@/interface';

export const useInfinitePropertyListingSearch = (
  params: Partial<PropertyListingSearchQuery> = {},
  enabled = false,
) => {
  return useInfiniteQuery({
    enabled,
    initialPageParam: 1,
    getPreviousPageParam: (firstPage) => {
      return firstPage.data.previousPage;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.data.nextPage;
    },
    queryKey: ['infinite-query-property-listing', JSON.stringify(params)],
    queryFn: async ({ pageParam }: QueryFunctionContext) => {
      return await axios.get<{
        properties: {
          results: Property[];
        };
        totalRecords: number;
        totalPages: number;
        currentPage: number;
        nextPage: number;
        previousPage: number;
      }>('/api/properties', {
        baseURL: Configs.listdApiUrl,
        params: cleanObject({ ...params, cursor: pageParam }),
      });
    },
  });
};
