import { Github, Globe, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ModeToggle } from "@/components/main/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { config } from "@/config/site";
import { cn } from "@/lib/utils";
export function SiteHeader() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 shadow-sm backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <div className="mr-2 font-semibold flex items-center align-middle justify-center gap-2">
          <Link href="/" className="flex items-center gap-2 align-middle">
            <Image
              src="/images/icon.png"
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
        <div className="flex">
          <nav className="flex items-center gap-1 mr-1">
            <Link
              href={config.links.website.url}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Globe className="h-5 w-5" />
                <span className="sr-only">Website</span>
              </div>
            </Link>
            <Link href={config.links.github} target="_blank" rel="noreferrer">
              <div
                className={cn(
                  buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={config.links.twitter.url}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
          </nav>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
