import { ThemeProvider } from "@/components/main/theme-provider";
import "./globals.css";
import { Inter } from "next/font/google";
import { TailwindIndicator } from "@/components/main/tailwind-indicator";
import { SiteFooter } from "@/components/main/footer";
import { SiteHeader } from "@/components/main/header";
import { config } from "@/config/site";
import { Metadata } from "next";

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
        width: 1200,
        height: 630,
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
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${config.url}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
