import { Logo } from '@/components/logo';
import { DESCRIPTION, TITLE } from '@/metadata';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  const poppinsSemiBold = await fetch(
    new URL('@/styles/Poppins-SemiBold.ttf', import.meta.url)
  ).then(r => r.arrayBuffer());

  const poppinsMedium = await fetch(
    new URL('@/styles/Poppins-Medium.ttf', import.meta.url)
  ).then(r => r.arrayBuffer());

  return new ImageResponse(
    <div tw="flex flex-col items-center h-full flex-1 py-24 px-24">
      <div tw="flex flex-col h-full flex-1 justify-center items-center">
        <h1
          tw="text-7xl font-semibold text-foreground text-center"
          style={{ width: 800 }}
        >
          {TITLE}
        </h1>
        <p style={{ width: 650 }} tw="text-3xl text-gray-500 text-center">
          {DESCRIPTION}
        </p>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Poppins Medium', data: poppinsMedium },
        { name: 'Poppins SemiBold', data: poppinsSemiBold }
      ]
    },
  )
}