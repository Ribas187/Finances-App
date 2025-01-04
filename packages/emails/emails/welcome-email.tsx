import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

type WelcomeEmailProps = {
  name: string
}

export const WelcomeEmail = ({ name = 'Vitor' }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>
      FinancesApp: sua plataforma de controle financeiro
    </Preview>
    <Tailwind>
      <Body className="mx-auto my-auto bg-white font-sans">
        <Container className="mx-auto bg-white py-12 px-8">
          <Section className="border mx-8">
            <Text className="text-md">
              Bem vindo ao FinancesApp {name}!.
            </Text>
            <Text>
              FinancesApp é uma plataforma de controle financeiro que te ajuda a organizar suas finanças de forma simples e eficiente.
            </Text> 
            <Button
              className="bg-blue-500 text-white rounded p-4"
              href="https://docs.turbostack.io"
            >
              Vamos lá
            </Button>
            <Text className="mt-4 text-md">
              Fale comigo se tiver qualquer problema, ficarei feliz em te ajudar.
            </Text>
            <Text className="text-md">Kind regards</Text>
            <Hr className="text-gray-100" />
            <Text className="text-md">
              Team FinancesApp
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

const box = {
  padding: '0 48px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};
const button = {
  padding: 10,
  backgroundColor: '#656ee8',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};

export default WelcomeEmail;