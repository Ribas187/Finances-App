import "@/styles/globals.css";
import type { Metadata } from "next";

import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import { defaultMetadata, twitterMetadata, ogMetadata } from '@/metadata';

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'], 
  subsets: ['latin'],
  variable: '--font-poppins' 
});

export const metadata: Metadata = {
  ...defaultMetadata,
  twitter: {
    ...twitterMetadata,
  },
  openGraph: {
    ...ogMetadata,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Toaster 
          toastOptions={{
            unstyled: true,
            classNames: {
              error: 'text-danger',
              success: 'text-primary',
              info: 'text-primary',
              warning: 'text-primary'
            }
          }}
        />
        {children}
      </body>
    </html>
  );
}
