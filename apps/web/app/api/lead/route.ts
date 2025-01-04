import { addUserToNewsletter } from "@/lib/emails";
import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function POST(req: Request) {
  const { email } = await req.json();
  
  try {
    const res = await addUserToNewsletter({ email })
  } catch (err) {
    console.log('There was an exception when submitting an email: ', err)
    return NextResponse.json({ 
      message: 'Could not submit an email' 
    }, {
      status: 400
    })
  }

  return NextResponse.json({
    message: 'E-mail submitted successfully'
  })
}