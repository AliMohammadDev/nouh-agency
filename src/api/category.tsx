import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Category } from '../types/category';

/* =======================
   GET ALL CATEGORIES
======================= */
export const useGetCategories = () => {
  const { i18n } = useTranslation();

  return useQuery<Category[]>({
    queryKey: ['categories', i18n.language],
    queryFn: async () => {
      const lang = i18n.language?.split('-')[0] || 'en';

      const res = await axios.get('categories', {
        headers: {
          'Accept-Language': lang,
        },
      });

      return res.data.data;
    },
  });
};

/* =======================
   GET ONE CATEGORY
======================= */
export const useGetCategory = (id: number | string) => {
  const { i18n } = useTranslation();

  return useQuery<Category>({
    queryKey: ['category', id, i18n.language],
    queryFn: async () => {
      const lang = i18n.language?.split('-')[0] || 'en';

      const res = await axios.get(`categories/${id}`, {
        headers: {
          'Accept-Language': lang,
        },
      });

      return res.data.data;
    },
    enabled: !!id,
  });
};
