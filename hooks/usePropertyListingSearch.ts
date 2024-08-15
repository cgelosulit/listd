import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { config } from '@/constants/Configs';
import { cleanObject } from '@/utils/cleanObject';
import { Property, PropertyListingSearchQuery } from '@/interface';

export const useInfinitePropertyListingSearch = (
  params: Partial<PropertyListingSearchQuery> = {},
  enabled = false,
) => {
  return useInfiniteQuery({
    enabled,
    initialPageParam: 1,
    getPreviousPageParam: (firstPage) => {
      console.log(firstPage.data.previousPage);
      return firstPage.data.previousPage;
    },
    getNextPageParam: (lastPage) => {
      console.log(lastPage.data.nextPage);
      return lastPage.data.nextPage;
    },
    queryKey: ['infinite-query-property-listing', JSON.stringify(params)],
    queryFn: async () =>
      await axios.get<{
        properties: {
          results: Property[];
        };
        totalRecords: number;
        totalPages: number;
        currentPage: number;
        nextPage: number;
        previousPage: number;
      }>('/api/properties', {
        baseURL: config.listdApiUrl,
        params: cleanObject(params),
      }),
  });
};
