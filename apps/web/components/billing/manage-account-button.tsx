'use client';

import { useCurrentProject } from "@/lib/queries/use-current-project";
import { Button } from "@turbostack/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function ManageAccountButton({ className }: { className?: string }) {
  const { project } = useCurrentProject();
  const [clicked, setClicked] = useState(false);
  const router = useRouter();

  return (
    <Button
      className={className}
      disabled={clicked}
      loading={clicked}
      onClick={async () => {
        setClicked(true);
        await fetch(`/api/projects/${project?.slug!}/billing/manage`, { method: 'POST' })
          .then(async res => {
            if (res.ok) {
              const { url } = await res.json();
              router.push(url);
              return;
            }

            const { error } = await res.json();
            toast.error(error.message);
            setClicked(false);
          })
      }}
    >
      Manage
    </Button>
  )
}