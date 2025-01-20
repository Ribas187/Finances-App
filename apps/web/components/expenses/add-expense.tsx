import { CreateCategoryExpenseDto } from "@/lib/models/category";
import { useCategories } from "@/lib/queries/use-categories";
import { useExpenses } from "@/lib/queries/use-expenses";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  InputCurrency,
  Label,
} from "@turbostack/ui";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

export function AddExpense() {
  const { slug } = useParams() as { slug?: string };
  const [expenseData, setExpenseData] =
    React.useState<CreateCategoryExpenseDto>({} as CreateCategoryExpenseDto);
  const [isOpen, setIsOpen] = React.useState(false);
  const {  currentCategory, mutate: refreshCategories } = useCategories();
  const { mutate, } = useExpenses();

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `/api/projects/${slug}/categories/expenses`,
        {
          method: "POST",
          body: JSON.stringify({
            ...expenseData,
            categoryId: currentCategory?.id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create category");
      }

      await mutate();
      refreshCategories();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <Button onClick={() => setIsOpen(true)} variant="outline">
        <Plus /> Adicionar despesa
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova despesa</DialogTitle>
          <DialogDescription>
            Crie um nova despesa para a categoria {currentCategory?.name}. Clique
            em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-row items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descrição
            </Label>
            <Input
              id="description"
              placeholder="ex: Compra na Shein"
              className="col-span-3"
              onChange={(e) =>
                setExpenseData({ ...expenseData, description: e.target.value })
              }
            />
          </div>
          <div className="flex flex-row items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Valor
            </Label>
            <InputCurrency
              id="amount"
              placeholder="ex: 1000,00"
              onChange={(e) =>
                setExpenseData({
                  ...expenseData,
                  amount: parseFloat(e.target.value),
                })
              }
            />
          </div>
          <div className="flex flex-row items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Data
            </Label>
            <Input
              id="date"
              type="datetime-local"
              className="col-span-3"
              onChange={(e) => {
                setExpenseData({
                  ...expenseData,
                  date: new Date(e.target.value),
                });
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
