'use client'

import { Button, Input, Google as GoogleIcon } from "@turbostack/ui";
import { useState } from "react";
import { signIn } from 'next-auth/react';
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams?.get("next");
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        signIn('email', {
          email,
          redirect: false,
          callbackUrl: '/'
        })
          .then(res => {
            if (res?.ok && !res?.error) {
              toast.success('Um email foi enviado! Cheque sua caixa de entrada.');
            } else {
              toast.error('Falha ao enviar email. Tente novamente.');
            }
          })
          .finally(() => setLoading(false));
      }} className="flex flex-col space-y-3">
        <div>
          <div className="mb-4" />
          <Input
            id="email"
            name="email"
            autoFocus
            type="email"
            placeholder="panic@thedis.co"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <Button loading={loading}>Continuar com email</Button>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou continue com
          </span>
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Button className="flex space-x-2" loading={loading} variant="accent" onClick={() => signIn("google", {
          ...(next && next.length > 0 ? { callbackUrl: next } : {}),
        })}>
          <GoogleIcon className="h-4 w-4" />
          <span>Google</span>
        </Button>
      </div>
    </>
  )
}