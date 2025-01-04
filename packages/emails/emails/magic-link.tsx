import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export const MagicLink = ({
  email = "panic@thedis.co",
  url = "http://localhost:8888/api/auth/callback/email?callbackUrl=http%3A%2F%2Fapp.localhost%3A3000%2Flogin&token=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&email=youremail@gmail.com",
}: {
  email: string;
  url: string;
}) => {
  return (
    <Html>
      <Head />
      <Preview>🪄 Seu Link para login | FinancesApp</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Heading className="mx-0 my-7 p-0 text-xl font-semibold text-foreground">
              🪄 Seu link de login
            </Heading>
            <Text className="text-sm leading-6">
              Por favor, clique no link abaixo para acessar sua conta.
            </Text>
            <Section className="mt-4 mb-8">
              <Link
                className="rounded-full text-center text-[12px] font-semibold text-purple-500 no-underline"
                href={url}
              >
                👉 Clique aqui para entrar 👈
              </Link>
            </Section>
            <Text className="mt-12">
              Valeu, 
              <br />- Guilherme Ribas
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default MagicLink;