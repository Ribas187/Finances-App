'use client'

import { CardForm } from '@turbostack/ui';
import React, { useCallback } from 'react';
import { UserAvatar } from '@/components/user/user-avatar';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

export function UserProfileForm() {
  const { data: session, update, status } = useSession();

  const handleSubmit = useCallback(async (data) => {
    return fetch('/api/user', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(async (res) => {
      if (res.status === 200) {
        update()
        toast.success('Successfully updated your data');
      } else {
        const { error } = await res.json();
        toast.error(error);
      }
    })
  }, [session, update])

  return (
    <div className="flex flex-col space-y-4">
      <CardForm
        title="Your Name"
        description="This will be your display name on TurboStack.io"
        helpText="Max 64 characters."
        inputAttrs={{
          name: 'name',
          defaultValue: status === 'loading' ? undefined : session?.user?.name || '',
          placeholder: 'Steve Wozniak'
        }}
        handleSubmit={handleSubmit}
      />

      <CardForm
        title="Your Email"
        description="This will be the email you use to log in to TurboStack.io and receive notifications."
        helpText="Must be a valid email address."
        inputAttrs={{
          name: 'email',
          type: 'email',
          defaultValue: session?.user?.email || undefined,
          placeholder: 'steve.woz@example.com'
        }}
        handleSubmit={handleSubmit}
      />

      <UserAvatar />
    </div>
  )
}