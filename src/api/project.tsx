import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Project } from '../types/project';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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

export const useGetRelatedProjects = (
  categoryId: number | undefined,
  currentProjectId: number | string | undefined
) => {
  const { i18n } = useTranslation();

  return useQuery<Project[]>({
    queryKey: ['projects', currentProjectId, 'related', i18n.language],
    queryFn: async () => {
      const lang = i18n.language?.split('-')[0] || 'en';

      const res = await axios.get(`projects/${currentProjectId}/related`, {
        headers: { 'Accept-Language': lang },
      });

      return res.data.data;
    },
    enabled: !!currentProjectId,
  });
};

export const useGetFeaturedProjects = () => {
  const { i18n } = useTranslation();

  return useQuery<Project[]>({
    queryKey: ['projects', 'featured', i18n.language],
    queryFn: async () => {
      const lang = i18n.language?.split('-')[0] || 'en';
      const res = await axios.get('projects/featured', {
        headers: {
          'Accept-Language': lang,
        },
      });
      return res.data.data;
    },
  });
};

export const useLikeProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectId: number | string) => {
      const res = await axios.post(`projects/${projectId}/like`);
      return res.data;
    },
    onSuccess: (data, projectId) => {
      queryClient.invalidateQueries({
        queryKey: ['project', projectId.toString()],
      });

      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

export const useGetTopLikedProjects = () => {
  const { i18n } = useTranslation();

  return useQuery<Project[]>({
    queryKey: ['projects', 'top-liked', i18n.language],
    queryFn: async () => {
      const lang = i18n.language?.split('-')[0] || 'en';
      const res = await axios.get('projects/top-liked', {
        headers: {
          'Accept-Language': lang,
        },
      });
      return res.data.data;
    },
  });
};
