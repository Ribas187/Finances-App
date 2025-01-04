

import useSWR from 'swr';
import { useParams } from 'next/navigation';
import { fetcher } from '@turbostack/utils';
import { Project } from '@/lib/models';

export function useCurrentProject() {
  const { slug } = useParams() as { slug?: string };

  const { data, error } = useSWR<Project>(`/api/projects/${slug}`, fetcher, {
    dedupingInterval: 10_000
  });

  return {
    project: data,
    error,
    loading: !data && !error,
    isOwner: data?.users && data.users[0].role === "owner",
  }
}