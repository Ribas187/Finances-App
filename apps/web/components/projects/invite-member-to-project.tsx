import { CardForm } from "@turbostack/ui";
import { useParams } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

export function InviteMemberToProject() {
  const { slug } = useParams() as { slug: string };

  const handleSubmit = useCallback(async (data) => {

    const promise = new Promise(async (resolve, reject) => {
      fetch(`/api/projects/${slug}/invites`, {
        method: 'POST',
        body: JSON.stringify({
          email: data.email
        })
      }).then(async res => {
        if (!res.ok) {
          const error = await res.json();         
          return reject(error);
        } 

        resolve(null)
      }).catch(err => {
        return reject(err);
      })
    })

    toast.promise(promise, {
      loading: 'Enviando convite...',
      success: 'Convite enviado com sucesso!',
      error: err => {
        return err?.message;
      }
    })
  }, []);

  return (
    <div className="flex justify-between items-end w-full">
      <CardForm
        title="Convidar Membro"
        description="Adicione um novo membro ao projeto."
        handleSubmit={handleSubmit}
        inputAttrs={{
          name: 'email',
          type: 'email',
          placeholder: 'steve.woz@examplecom',
        }}
        helpText="Você pode convidar qualquer pessoa para o projeto, mesmo que ela não tenha uma conta."
        submitButtonText="Enviar"
      />
    </div>
  )
}