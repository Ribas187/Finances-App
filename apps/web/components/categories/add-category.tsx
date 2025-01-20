import { CreateCategoryDto } from "@/lib/models/category";
import { useCategories } from "@/lib/queries/use-categories";
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

export function AddCategory() {
  const { slug } = useParams() as { slug?: string };
  const [categoryData, setCategoryData] = React.useState<CreateCategoryDto>({
    color: "#000",
  } as CreateCategoryDto);
  const [isOpen, setIsOpen] = React.useState(false);
  const { mutate } = useCategories();

  const handleSubmit = async () => {
    const { name, budget, color } = categoryData;

    try {
      const response = await fetch(`/api/projects/${slug}/categories`, {
        method: "POST",
        body: JSON.stringify({ name, budget, color }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create category");
      }

      await mutate();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <Button onClick={() => setIsOpen(true)} variant="outline">
        <Plus /> Adicionar categoria
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova categoria</DialogTitle>
          <DialogDescription>
            Crie uma nova categoria para organizar seus gastos. Clique em salvar
            quando terminar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              placeholder="ex: Alimentação"
              className="col-span-3"
              onChange={(e) =>
                setCategoryData({ ...categoryData, name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-row items-center gap-4">
            <Label htmlFor="budget" className="text-right">
              Orçamento
            </Label>
            <InputCurrency
              id="budget"
              placeholder="ex: 1000,00"
              onChange={(e) =>
                setCategoryData({
                  ...categoryData,
                  budget: parseFloat(e.target.value),
                })
              }
            />
          </div>
          <div className="flex flex-row items-center gap-4">
            <Label htmlFor="color" className="text-right">
              Cor
            </Label>
            <Input
              id="color"
              type="color"
              className="col-span-3"
              defaultValue={"#000000"}
              onChange={(e) =>
                setCategoryData({ ...categoryData, color: e.target.value })
              }
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
