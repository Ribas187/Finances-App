import { Dispatch, SetStateAction, createContext, useEffect } from "react"
import { useAcceptInviteModal } from "../projects/accept-invite-modal";
import { useCurrentProject } from "@/lib/queries/use-current-project";

type DialogContextProps = {
  setShowAcceptInviteModal: Dispatch<SetStateAction<boolean>>;
}

const DialogContext = createContext<DialogContextProps>({
  setShowAcceptInviteModal: () => { }
})

export function DialogProvider({ children }: { children?: React.ReactNode }) {
  const { setShowAcceptInviteModal, AcceptInviteModal } = useAcceptInviteModal();

  const { error } = useCurrentProject();

  useEffect(() => {
    if ([409, 410].includes(error?.status)) {
      setShowAcceptInviteModal(true);
    }
  }, [error]);

  return (
    <DialogContext.Provider
      value={{
        setShowAcceptInviteModal
      }}
    >
      {children}
      <AcceptInviteModal />
    </DialogContext.Provider>
  )
}