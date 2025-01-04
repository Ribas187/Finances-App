
import { Body, Container, Head, Heading, Html, Link, Preview, Tailwind, Text } from "@react-email/components";

export const UpgradeEmail = ({
  name = 'Vitor',
  email,
  plan = 'Pro'
}: {
  name: string,
  email: string,
  plan: string
}) => {
  return (
    <Html>
      <Head />
      <Preview>💝 Thank you for your Purchase!</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Heading className="mx-0 my-7 p-0 text-xl font-semibold text-foreground">
              💝 Thank you for your Purchase!
            </Heading>
            <Text className="text-sm leading-6 text-primary">
              Hey{name && ` ${name}`}!
            </Text>
            <Text className="text-sm leading-6 text-black">
              My name is Vitor, and I'm the founder of TurboStack. I wanted to
              personally reach out to thank you for upgrading to{" "}

              <Link
                href={"https://turbostack.io/#pricing"}
                className="font-medium text-blue-600 no-underline"
              >
                TurboStack {plan}
              </Link>
            </Text>
            <Text className="text-sm leading-6 text-black">
              Let me know if you have any questions or feedback. I'm always
              happy to help!
            </Text>
            <Text className="text-sm leading-6 text-black">
              Kind Regards
            </Text>
            <Text className="text-sm leading-6 text-black">
              - TurboStack Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default UpgradeEmail