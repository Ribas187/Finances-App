import { useCurrentProject } from "@/lib/queries/use-current-project";
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@turbostack/ui";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

type AcceptInviteModalProps = {
  showAcceptInviteModal: boolean,
  setShowAcceptInviteModal: Dispatch<SetStateAction<boolean>>;
}

function AcceptInviteModal({ showAcceptInviteModal, setShowAcceptInviteModal }: AcceptInviteModalProps) {
  const { slug } = useParams() as { slug?: string };
  const { error } = useCurrentProject();
  const [loading, setLoading] = useState(false);

  const acceptInvite = useCallback(async () => {
    setLoading(true);

    const promise = new Promise(async (resolve, reject) => {
      fetch(`/api/projects/${slug}/invites/accept`, {
        method: 'POST'
      }).then(async res => {
        if (!res.ok){
          const text = await res.text();
          setLoading(false);
          return reject(text);
        }

        resolve(null)
      }).then(async () => {
        await Promise.all([
          mutate("/api/projects"),
          mutate(`/api/projects/${slug}`)
        ])

        setShowAcceptInviteModal(false);
      })
    })

    toast.promise(promise, {
      loading: 'Aceitando convite',
      success: `Você agora faz parte do projeto ${slug}`,
      error: err => err
    })
  }, [slug])

  return (
    <Dialog
      open={showAcceptInviteModal}
    >
      <DialogContent className="sm:max-w-[425px]" >
        {error?.status === 409 ? (
          <>
            <DialogHeader className="items-center">
              <DialogTitle>Você recebeu um convite!</DialogTitle>
              <DialogDescription className="text-center">Você foi convidado para entrar no projeto <span className="font-semibold text-foreground">{slug}</span></DialogDescription>
            </DialogHeader>
            <div className="mt-3 border-t border-border pt-6">
              <Button onClick={acceptInvite} loading={loading}>Aceitar convite</Button>
            </div>
          </>
        ) : (
          <></>
        )}
      </DialogContent>
    </Dialog>
  )
}

export function useAcceptInviteModal() {
  const [showAcceptInviteModal, setShowAcceptInviteModal] = useState(false);

  const MemoizedAcceptInviteModal = useCallback(() => {
    return <AcceptInviteModal 
      showAcceptInviteModal={showAcceptInviteModal} 
      setShowAcceptInviteModal={setShowAcceptInviteModal}
    />
  }, [showAcceptInviteModal, setShowAcceptInviteModal]);

  return useMemo(() => ({
    setShowAcceptInviteModal,
    AcceptInviteModal: MemoizedAcceptInviteModal
  }), [setShowAcceptInviteModal, MemoizedAcceptInviteModal])
}