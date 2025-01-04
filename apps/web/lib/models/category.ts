export type Category = {
  id: string;
  name: string;
  projectId: string;
  budget: number;
  color: string;
  expensesSum?: number;
  categoriesExpenses?: CategoryExpense[];
}

export type CategoryExpense = {
  id: string;
  categoryId: string;
  description: string;
  amount: number;
  date: string;
  active: boolean;
}