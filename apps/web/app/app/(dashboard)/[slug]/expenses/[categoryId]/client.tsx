"use client";

import { AddExpense } from "@/components/expenses/add-expense";
import { ExpensesList } from "@/components/expenses/expenses-list";
import { useCategories } from "@/lib/queries/use-categories";
import { Progress } from "@turbostack/ui";

export function CategoryExpensesPageClient() {
  const { currentCategory, loading } = useCategories();

  if (!currentCategory) return null;

  return (
    <>
      <p className="text-muted-foreground my-2 text-xl">
        {loading ? "..." : currentCategory?.name}
      </p>
      <div className="mb-8 flex flex-col">
        <Progress
          progressColor={currentCategory?.color}
          value={
            ((currentCategory?.expensesSum || 0) * 100) /
            currentCategory?.budget
          }
          className={`w-[%{(currentCategory?.expensesSum || 0) * 100 / currentCategory?.budget)}%] mt-2`}
        />
      </div>
      <AddExpense />
      <div className="mt-6" />
      <ExpensesList />
    </>
  );
}
