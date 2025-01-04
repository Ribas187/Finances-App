import { ProjectUser } from "@/lib/models";
import { fetcher } from "@turbostack/utils";
import { useParams } from "next/navigation";
import useSWR from "swr";

export function useProjectMembers() {
  const { slug } = useParams() as { slug: string };

  const { data, error } = useSWR<ProjectUser[]>(`/api/projects/${slug}/users`, fetcher, {
    dedupingInterval: 10_000
  });

  return {
    members: data,
    error,
    loading: !data && !error,
  }
}