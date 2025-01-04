export type Category = {
  id: string;
  name: string;
  projectId: string;
  budget: number;
  color: string;
  expensesSum?: number;
  categoriesExpenses?: CategoryExpense[];
}

export type CreateCategoryDto = {
  name: string;
  budget: number;
  color: string;
}

export type CategoryExpense = {
  id: string;
  categoryId: string;
  description: string;
  amount: number;
  date: Date;
  active: boolean;
}

export type CreateCategoryExpenseDto = {
  categoryId: string;
  description: string;
  amount: number;
  date: Date;
}