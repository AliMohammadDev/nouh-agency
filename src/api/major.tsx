import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Major } from '../types/major';

export const useGetMajors = () => {
  const { i18n } = useTranslation();

  return useQuery<Major[]>({
    queryKey: ['majors', i18n.language],
    queryFn: async () => {
      const lang = i18n.language?.split('-')[0] || 'en';

      const res = await axios.get('majors', {
        headers: {
          'Accept-Language': lang,
        },
      });

      return res.data.data;
    },
  });
};

export const useGetMajor = (id: number | string) => {
  const { i18n } = useTranslation();

  return useQuery<Major>({
    queryKey: ['major', id, i18n.language],
    queryFn: async () => {
      const lang = i18n.language?.split('-')[0] || 'en';

      const res = await axios.get(`majors/${id}`, {
        headers: {
          'Accept-Language': lang,
        },
      });

      return res.data.data;
    },
    enabled: !!id,
  });
};
