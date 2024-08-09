import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { config } from '@/constants/Configs';
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
      }>('/api/webhooks/properties/map-search', {
        baseURL: config.listdApiUrl,
        params,
      }),
  });
};
