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

export function CategoriesList() {
  const { categories, loading, error } = useCategories();

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

            <CardDescription className="pt-2 flex items-end flex-col">
              <span >
                R${category.expensesSum?.toFixed(2)} / R$
                {category.budget.toFixed(2)}
              </span>

              <Progress
                progressColor={category.color}
                value={((category.expensesSum || 0) * 100) / category.budget}
                className={`mt-2 w-[%{(category.expensesSum || 0) * 100 / category.budget)}%]`}
              />
            </CardDescription>
          </CardHeader>

          <CardContent></CardContent>

          <CardFooter className="flex justify-end">
            <Button variant={"outline"}>Abrir gastos</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
