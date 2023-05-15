import { ThemeProvider } from "@/components/main/theme-provider";
import "../globals.css";
import { Inter } from "next/font/google";
import { TailwindIndicator } from "@/components/main/tailwind-indicator";
import { SiteFooter } from "@/components/main/footer";
import { SiteHeader } from "@/components/main/header";
import { config } from "@/config/site";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: config.name,
    template: `${config.name} - %s`,
  },
  description: config.description,
  keywords: config.keywords,
  authors: [
    {
      name: config.links.website.author,
      url: config.links.website.url,
    },
  ],
  creator: config.links.website.author,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: config.url,
    title: config.name,
    description: config.description,
    siteName: config.name,
    images: [
      {
        url: config.ogImage,
        width: 772,
        height: 772,
        alt: config.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: config.name,
    description: config.description,
    images: [config.ogImage],
    creator: config.links.twitter.handle,
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/images/icons/icon-72x72.png",
    apple: "/images/icons/icon-192x192.png",
  },
  manifest: `${config.url}/site.webmanifest`,
};

export default function WatchlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.png" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
          <Analytics />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
