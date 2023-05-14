import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-row items-center justify-center md:p-24">
      <SignIn
        path="/sign-in"
        routing="path"
        afterSignInUrl="/dashboard"
        appearance={{
          elements: {
            footerAction__signIn: {
              display: "none",
            },
          },
        }}
      />
    </main>
  );
}
