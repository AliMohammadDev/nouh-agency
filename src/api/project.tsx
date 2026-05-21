import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Project } from '../types/project';

export const useGetProjects = () => {
  const { i18n } = useTranslation();

  return useQuery<Project[]>({
    queryKey: ['projects', i18n.language],
    queryFn: async () => {
      const lang = i18n.language?.split('-')[0] || 'en';

      const res = await axios.get('projects', {
        headers: {
          'Accept-Language': lang,
        },
      });

      return res.data.data;
    },
  });
};

export const useGetProject = (id: number | string) => {
  const { i18n } = useTranslation();

  return useQuery<Project>({
    queryKey: ['project', id, i18n.language],
    queryFn: async () => {
      const lang = i18n.language?.split('-')[0] || 'en';

      const res = await axios.get(`projects/${id}`, {
        headers: {
          'Accept-Language': lang,
        },
      });

      return res.data.data;
    },
    enabled: !!id,
  });
};
