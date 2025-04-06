import { A } from "@solidjs/router";
import { Button } from "~/components/ui/button";

export default function NotFound() {
  return (
    <main class="flex flex-col items-center justify-center">
      <h1 class="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p class="mb-2">The page you are looking for does not exist.</p>
      <Button as={A} href="/" variant="link">
        Go back to the homepage
      </Button>
    </main>
  );
}
