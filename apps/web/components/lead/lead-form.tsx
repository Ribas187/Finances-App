'use client';

import { Button, Input } from "@turbostack/ui";
import { cn } from "@turbostack/utils";
import { useState } from "react";
import { toast } from "sonner";

export function LeadForm({ className }: { className?: string }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  return (
    <form
      className={cn("flex space-x-2 max-w-2xl w-full", className)}
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
          await fetch('/api/lead', {
            method: 'POST',
            body: JSON.stringify({ email })
          })

          toast.success('Success! Your e-mail was added to our waitlist. We\'ll get in touch soon')
        } catch (err) {
          console.log(err);

          toast.error('Error! We couldn\t add your email to our waitlist. We\'ve been notified and will get through this bug as soon as posible.')
        } finally {
          setEmail('');
          setLoading(false);
        }
      }}>
      <Input
        name="email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Your best e-mail"
        required
      />
      <Button className="w-full max-w-[240px]" loading={loading} disabled={!email || loading}>Join waitlist</Button>
    </form>
  )
}