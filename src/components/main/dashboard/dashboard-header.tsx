import Image from "next/image";
import Link from "next/link";

import { ModeToggle } from "@/components/main/mode-toggle";

import ClerkButton from "./clerk-button";

export function DashboardHeader() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 shadow-sm backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="mr-2 font-semibold flex items-center align-middle justify-center gap-2">
          <Link href="/" className="flex items-center gap-2 align-middle">
            <Image
              src="/icon.png"
              alt="AbrahamX3 Icon"
              className="h-6 w-6"
              width={32}
              height={32}
            />
            <p className="text-lg text-center">
              <span className="hidden md:inline-block">Abraham&apos;s</span>{" "}
              <span className="">Watchlist</span>
            </p>
          </Link>
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
