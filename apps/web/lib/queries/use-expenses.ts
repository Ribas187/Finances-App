import { fetcher } from "@turbostack/utils";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { CategoryExpense } from "../models/category";

export function useExpenses() {
  const { slug, categoryId } = useParams() as {
    slug?: string;
    categoryId?: string;
  };

  const { data, error, mutate } = useSWR<CategoryExpense[]>(
    `/api/projects/${slug}/categories/expenses?categoryId=${categoryId}`,
    fetcher,
    {
      dedupingInterval: 10_000,
    },
  );

  return {
    expenses: data,
    error,
    loading: !data && !error,
    mutate,
  };
}
