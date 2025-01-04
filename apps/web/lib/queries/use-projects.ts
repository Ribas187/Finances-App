import useSWR from 'swr';
import { fetcher } from '@turbostack/utils';
import { Project } from '@/lib/models';

export function useProjects() {
  const { data, error } = useSWR<Project[]>(`/api/projects`, fetcher);

  return {
    projects: data,
    error,
    loading: !data && !error 
  }
}