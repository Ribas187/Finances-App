'use client';

import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, FileUpload } from '@turbostack/ui';
import { AVATAR_DICEBEAR_URL } from '@turbostack/utils';
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from 'sonner';

export function UserAvatar() {
  const { data: session, update } = useSession();
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState<string | null>();

  useEffect(() => {
    setImage(
      session?.user?.image ||
      (session?.user?.email ? `${AVATAR_DICEBEAR_URL}${session.user.email}` : null)
    )
  }, [session]);

  const handleSubmit = useCallback(async (e) => {
    setUploading(true);
    e.preventDefault();
    fetch("/api/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image }),
    }).then(async (res) => {
      setUploading(false);
      if (res.status === 200) {
        await update();
        toast.success("Successfully updated your profile picture!");
      } else {
        const errorMessage = await res.text();
        toast.error(errorMessage || "Something went wrong");
      }
    });
  }, [])

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Your Avatar</CardTitle>
          <CardDescription>This is your avatar image on TurboStack.io</CardDescription>
        </CardHeader>
        <CardContent>
          <FileUpload
            accept="images"
            className="h-24 w-24 rounded-full border"
            iconClassName="w-5 h-5"
            variant="plain"
            imageSrc={image}
            readFile
            onChange={({ src }) => setImage(src)}
            content={null}
            maxFileSizeMB={2}
          />
        </CardContent>
        <CardFooter className="flex justify-between space-x-4 border-t py-4 items-center">
          <p className="text-sm text-muted-foreground">Square image recommended. Accepted file types: .png, .jpg</p>
          <div className="shrink-0">
            <Button
              loading={uploading}
              disabled={!image || session?.user?.image === image}
            >Save Changes</Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  )
}