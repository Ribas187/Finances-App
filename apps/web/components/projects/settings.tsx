"use client";

import { useCurrentProject } from "@/lib/queries/use-current-project";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardForm,
  CardHeader,
  CardTitle,
  Input,
} from "@turbostack/ui";
import { Check, Copy } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

export function ProjectSettingsForm() {
  const { project, loading: projectLoading } = useCurrentProject();
  const [copiedSlug, setCopiedSlug] = useState(false);

  const handleSubmit = useCallback(
    async (data) => {
      console.log(data)
      return fetch(`/api/projects/${project!.slug}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        if (res.ok) {
          await Promise.all([
            mutate("/api/projects"),
            mutate(`/api/projects/${project!.slug}`),
          ]);
          toast.success("Projeto atualizado com sucesso");
        }
      });
    },
    [project],
  );

  const copySlug = useCallback(async () => {
    await navigator.clipboard.writeText(project!.slug);
    toast.success("Copiado para a área de transferência");

    setCopiedSlug(true);
  }, [project]);

  return (
    <>
      <CardForm
        title="Nome do projeto"
        description="Este é o nome do seu projeto"
        inputAttrs={{
          name: "name",
          placeholder: "Digite o nome do projeto",
          defaultValue: projectLoading ? undefined : project?.name,
          maxLength: 64,
        }}
        helpText="Máximo de 64 caracteres"
        handleSubmit={handleSubmit}
      />

      <div className="mt-4" />

      <CardForm
        title="Orçamento"
        description="Este é o orçamento total do seu projeto"
        inputAttrs={{
          name: "budget",
          placeholder: "Digite o valor",
          defaultValue: projectLoading ? undefined : project?.budget,
          maxLength: 64,
          type: "number",
          datatype: "currency",
        }}
        helpText="  "
        handleSubmit={handleSubmit}
      />

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Apelido do projeto</CardTitle>
          <CardDescription>
            Este é o identificador único de seu projeto no Finances App
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              name="slug"
              className="max-w-lg"
              value={project?.slug}
              placeholder="Apelido do projeto"
              readOnly
            />
            <Button
              onClick={copySlug}
              variant="secondary"
              className="flex w-auto items-center gap-1"
            >
              <p>{copiedSlug ? "Copiado" : "Copiar"}</p>
              {copiedSlug ? <Check size={16} /> : <Copy size={16} />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
