'use client';

import { Crisp } from 'crisp-sdk-web';
import { useEffect } from 'react';

export function SupportChat() {
  useEffect(() => {
    process.env.CRISP_CHAT_ID && Crisp.configure(process.env.CRISP_CHAT_ID!)
  }, []);

  return <></>
}