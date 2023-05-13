import { SignIn, UserButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-row items-center justify-center md:p-24">
      <UserButton />
      <SignIn
        path="/sign-in"
        routing="path"
        afterSignInUrl="/admin"
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
