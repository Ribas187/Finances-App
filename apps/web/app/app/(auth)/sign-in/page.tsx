import { Logo } from "@/components/logo";
import LoginForm from "./form";

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12 bg-card">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="w-full flex justify-center">
              <Logo />
            </div>

            <h1 className="mt-4 text-3xl font-bold">Login</h1>
            <p className="text-sm text-muted-foreground">
              Digite seu email para acessar sua conta
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
      <div className="hidden lg:block bg-primary">
        {/* PRO TIP: Put an image that describes or welcome your users to your app */}
        {/* <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        /> */}
      </div>
    </div>
  );
}
