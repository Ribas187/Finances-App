"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@turbostack/ui";
import { DeleteProjectModal } from "./delete-project-modal";

export function DeleteProject() {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Deletar projeto</CardTitle>
        <CardDescription>
          Deletar projeto permanentemente, com todos os dados, todas as
          associações de equipe. Esta ação não pode ser desfeita, prossiga com
          isso apenas se realmente necessário.
        </CardDescription>
      </CardHeader>
      <CardFooter className="border-t py-4">
        <DeleteProjectModal />
      </CardFooter>
    </Card>
  );
}
