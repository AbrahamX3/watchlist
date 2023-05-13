import Link from "next/link";
import { config } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/main/mode-toggle";
import { Github, Globe, Sheet, Twitter } from "lucide-react";
import {
  SignedIn,
  UserButton,
  SignedOut,
  SignInButton,
  useAuth,
} from "@clerk/nextjs";
import ClerkButton from "./clerk-button";

export function DashboardHeader() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 shadow-sm backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="mr-2 font-semibold flex items-center align-middle justify-center gap-2">
          <Sheet className="h-5 w-5" />
          <span>Abraham&apos;s Watchlist</span>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <nav className="flex items-center space-x-1">
            <div className="mr-2">
              <ModeToggle />
            </div>
            <ClerkButton />
          </nav>
        </div>
      </div>
    </header>
  );
}
