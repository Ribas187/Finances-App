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
      TurboStack: Ship your startup at TurboSpeed
    </Preview>
    <Tailwind>
      <Body className="mx-auto my-auto bg-white font-sans">
        <Container className="mx-auto bg-white py-12 px-8">
          <Section className="border mx-8">
            <Text className="text-md">
              Welcome to TurboStack {name}!.
            </Text>
            <Text>
              TurboStack is a SaaS template that allows makers to ship their ideas at Turbo Speed.
            </Text> 
            <Button
              className="bg-blue-500 text-white rounded p-4"
              href="https://docs.turbostack.io"
            >
              Get started
            </Button>
            <Text className="mt-4 text-md">
              Let me know if you have any issues, i'll gladly help you solve them.
            </Text>
            <Text className="text-md">Kind regards</Text>
            <Hr className="text-gray-100" />
            <Text className="text-md">
              TurboStack Team
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