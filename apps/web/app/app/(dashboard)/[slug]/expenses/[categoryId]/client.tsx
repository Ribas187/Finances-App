"use client";

import { AddExpense } from "@/components/expenses/add-expense";
import { ExpensesList } from "@/components/expenses/expenses-list";
import { useCategories } from "@/lib/queries/use-categories";

export function CategoryExpensesPageClient() {
  const { currentCategory, loading } = useCategories();

  return (
    <>
      <p className="text-muted-foreground my-2 text-xl">
        {loading ? "..." : currentCategory?.name}
      </p>
      <AddExpense />
      <div className="mt-6" />
      <ExpensesList />
    </>
  );
}
