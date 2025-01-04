import { 
  Background, 
  Button, 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader,
  CardTitle 
} from "@turbostack/ui";
import Link from "next/link";

export function NotFoundProject() {
  return (
    <div className="flex h-screen justify-center items-center">
      <Background />
      <Card className="relative h-fit w-full max-w-xl">
        <CardHeader className="space-y-2 flex flex-col items-center">
          <CardTitle>Project Not Found</CardTitle>
          <CardDescription className="max-w-md text-center">
            Oops... The project that you are looking for does not exist. You either typed in the wrong URL or don't have access to this project
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-3 flex flex-col space-y-4 items-center">
          <Link href="/">
            <Button>Go to Home</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}