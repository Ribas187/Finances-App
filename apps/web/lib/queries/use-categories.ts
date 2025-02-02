import { fetcher } from "@turbostack/utils";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { Category } from "../models/category";

export function useCategories() {
  const { slug, categoryId } = useParams() as {
    slug?: string;
    categoryId?: string;
  };

  const { data, error, mutate } = useSWR<Category[]>(
    `/api/projects/${slug}/categories`,
    fetcher,
    {
      dedupingInterval: 10_000,
    },
  );

  const currentCategory = data?.find((category) => category.id === categoryId);

  return {
    categories: data,
    currentCategory,
    error,
    loading: !data && !error,
    mutate,
  };
}
