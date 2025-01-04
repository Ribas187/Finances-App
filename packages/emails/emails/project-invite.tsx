import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface ProjectInviteEmailProps {
  invitedByUsername?: string;
  invitedByEmail?: string;
  projectName?: string;
  inviteLink?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const ProjectInviteEmail = ({
  invitedByUsername = 'liverday',
  invitedByEmail = 'vitor@turbostack.io',
  projectName = 'MyProject',
  inviteLink = 'https://app.turbostack.io/projects/foo',
}: ProjectInviteEmailProps) => {
  const previewText = `Entre em ${invitedByUsername}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-background my-auto mx-auto font-sans">
          <Container className="border-solid border rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/_static/favicon.ico`}
                width="40"
                height="37"
                alt="Vercel"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-foreground text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Entre no <strong>{projectName}</strong>
            </Heading>
            <Text className="text-foreground text-[14px] leading-[24px]">
              Hello!
            </Text>
            <Text className="text-foreground text-[14px] leading-[24px]">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-primary no-underline"
              >
                {invitedByEmail}
              </Link>
              ) convidou você para o projeto <strong>{projectName}</strong> no {' '}
              <strong>Finances App</strong>.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Link
                className="px-6 py-4 rounded text-primary-foreground text-[12px] font-semibold no-underline text-center"
                href={inviteLink}
              >
                👉 Entrar no projeto 👈
              </Link>
            </Section>
            <Text className="text-foreground text-[14px] leading-[24px]">
              ou copie e cole este link no navegador:{' '}
              <Link
                href={inviteLink}
                className="text-primary no-underline"
              >
                {inviteLink}
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ProjectInviteEmail;