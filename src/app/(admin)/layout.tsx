import { ThemeProvider } from "@/components/main/theme-provider";

import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Analytics } from "@vercel/analytics/react";
import { type Metadata } from "next";
import { Inter } from "next/font/google";

import { DashboardHeader } from "@/components/main/dashboard/dashboard-header";
import { TailwindIndicator } from "@/components/main/tailwind-indicator";
import { Toaster } from "@/components/ui/toaster";
import { config } from "@/config/site";

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
    icon: "/images/icon.png",
    shortcut: "/images/icons/icon-72x72.png",
    apple: "/images/icons/icon-192x192.png",
  },
  manifest: `${config.url}/manifest.json`,
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link
            rel="shortcut icon"
            href="/images/icon.png"
            type="image/x-icon"
          />
        </head>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <DashboardHeader />
              <div className="flex-1">{children}</div>
              <Toaster />
            </div>
            <Analytics />
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
