"use client";

import {
  useAuth,
  SignedIn,
  UserButton,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";

export default function ClerkButton() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </>
  );
}
