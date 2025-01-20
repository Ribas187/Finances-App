import { useExpenses } from "@/lib/queries/use-expenses";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@turbostack/ui";
import { format } from "date-fns";
import { Trash } from "lucide-react";
import { useParams } from "next/navigation";

export function ExpensesList() {
  const { slug } = useParams() as { slug?: string };
  const { expenses, loading, error, mutate } = useExpenses();

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `/api/projects/${slug}/categories/expenses?id=${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }

      await mutate();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {expenses?.map((expense) => (
        <Card key={expense.id} className="p-0">
          <CardHeader className="flex flex-row items-center justify-between text-lg font-semibold">
            <CardTitle>{expense.description}</CardTitle>

            <CardDescription>
              <span>R${expense.amount?.toFixed(2)}</span>
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-row items-center justify-between">
            <CardDescription className="flex flex-col">
              <span>Dia: {format(expense.date, "EE',' dd 'de' MMM")}</span>
              <span>Hora: {format(expense.date, "hh:mm")}</span>
            </CardDescription>
            <Button variant={"ghost"} onClick={() => handleDelete(expense.id)}>
              <Trash />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
