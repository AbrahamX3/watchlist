import Image from "next/image";

import { config } from "@/config/site";
import Link from "next/link";
export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href={config.links.twitter.url}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              AbrahamX3
            </a>
            . Source code available on{" "}
            <a
              href={config.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <div className="text-center items-center text-sm leading-loose text-muted-foreground flex gap-2 align-middle">
          <p className="font-semibold">Powered by </p>
          <a rel="noopener" target="_blank" href="https://www.themoviedb.org/">
            <Image
              src="/icons/tmdb.svg"
              alt="TMDb Icon"
              className="h-12 w-12"
              width={32}
              height={32}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
