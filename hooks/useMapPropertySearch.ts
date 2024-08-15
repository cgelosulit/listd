import axios from 'axios';
import { config } from '@/constants/Configs';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Property, PropertyMapSearchQuery } from '@/interface';

export const useMapPropertySearch = (
  params: Partial<PropertyMapSearchQuery> = {},
  enabled = false,
) => {
  return useQuery({
    enabled,
    queryKey: ['properties', JSON.stringify(params)],
    queryFn: async () =>
      await axios.get<{
        properties: {
          results: Property[];
        };
        prevId: number;
        nextId: number;
        prevCursor: number;
      }>('/api/properties/map-search', {
        baseURL: config.listdApiUrl,
        params,
      }),
  });
};

export const useInfiniteMapPropertySearch = (
  params: Partial<PropertyMapSearchQuery> = {},
  enabled = false,
) => {
  return useInfiniteQuery({
    enabled,
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => firstPage.data.prevId,
    getNextPageParam: (lastPage) => lastPage.data.nextId,
    queryKey: ['infinite-query-property-map-search', JSON.stringify(params)],
    queryFn: async () =>
      await axios.get<{
        properties: {
          results: Property[];
        };
        prevId: number;
        nextId: number;
        prevCursor: number;
      }>('/api/properties/map-search', {
        baseURL: config.listdApiUrl,
        params,
      }),
  });
};
