import { JSXElementConstructor, ReactElement } from "react";
import { Resend } from "resend";

type SendEmailProps = {
  to: string;
  subject: string;
  react?: ReactElement<any, string | JSXElementConstructor<any>>;
  text?: string;
  html?: string;
};

const client = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  react,
  text,
  html,
}: SendEmailProps) {
  console.log('sending email to ', to);
  const response = await client.emails.send({
    from: "guilherme@makemyplanners.com",
    to,
    subject,
    ...(text && { text }),
    ...(html && { html }),
    ...(react && { react }),
  } as any);

  
  if(response.error) {
    console.error(response.error);
  }
  console.log('email sent ', response);

  return response;
}

type AddUserToNewsletterProps = {
  firstName?: string;
  lastName?: string;
  email: string;
};

export async function addUserToNewsletter({
  firstName,
  lastName,
  email,
}: AddUserToNewsletterProps) {
  const response = await client.contacts.create({
    audienceId: process.env.RESEND_AUDIENCE_ID as string,
    email,
    firstName: firstName ?? "",
    lastName: lastName ?? "",
  });

  if (response.error) {
    return Promise.reject(response.error);
  }

  return Promise.resolve(response);
}
