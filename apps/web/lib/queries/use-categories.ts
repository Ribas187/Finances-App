import { fetcher } from "@turbostack/utils";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { Category } from "../models/category";

export function useCategories() {
  const { slug } = useParams() as { slug?: string };

  const { data, error, mutate } = useSWR<Category[]>(
    `/api/projects/${slug}/categories`,
    fetcher,
    {
      dedupingInterval: 10_000,
    },
  );

  return {
    categories: data,
    error,
    loading: !data && !error,
    mutate,
  };
}
