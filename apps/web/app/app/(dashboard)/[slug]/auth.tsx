'use client';

import { ReactNode } from 'react';
import { useCurrentProject } from '@/lib/queries/use-current-project';
import { LoadingLayout } from '@/components/layout/loading-layout';
import { NotFoundProject } from '@/components/projects/not-found-project';

export function ProjectAuth({ children }: { children?: ReactNode }) {
  const { loading, error } = useCurrentProject();

  if (loading) {
    return <LoadingLayout />
  }
  
  if (error && error.status === 404) {
    return <NotFoundProject />
  }

  return children;
}