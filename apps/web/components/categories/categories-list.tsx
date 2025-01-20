import { useCategories } from "@/lib/queries/use-categories";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Progress,
} from "@turbostack/ui";
import { AlertCircle, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export function CategoriesList() {
  const { slug } = useParams() as { slug?: string };
  const { categories, loading, error, mutate } = useCategories();
  const { push } = useRouter();

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `/api/projects/${slug}/categories?id=${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      await mutate();
    } catch (error) {
      console.error(error);
    }
  };

  const onOpenExpenses = (id: string) => {
    push(`/${slug}/expenses/${id}`);
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories?.map((category) => (
        <Card key={category.id} className="p-0">
          <div
            className="w-ful h-7 rounded-t-lg"
            style={{ backgroundColor: category.color }}
          />

          <CardHeader className="text-lg font-semibold">
            <CardTitle>{category.name}</CardTitle>

            <CardDescription className="flex flex-col items-end pt-2">
              <span className="flex items-center gap-2">
                {category.expensesSum &&
                  category.expensesSum > category.budget && (
                    <AlertCircle name="warning" className="text-red-500" />
                  )}
                R${category.expensesSum?.toFixed(2)} / R$
                {category.budget.toFixed(2)}
              </span>

              <Progress
                progressColor={category.color}
                value={((category.expensesSum || 0) * 100) / category.budget}
                className={`w-[%{(category.expensesSum || 0) * 100 / category.budget)}%] mt-2`}
              />
            </CardDescription>
          </CardHeader>

          <CardContent></CardContent>

          <CardFooter className="flex justify-between">
            <Button variant={"ghost"} onClick={() => handleDelete(category.id)}>
              <Trash />
            </Button>
            <Button
              onClick={() => onOpenExpenses(category.id)}
              variant={"outline"}
            >
              Abrir despesas
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
