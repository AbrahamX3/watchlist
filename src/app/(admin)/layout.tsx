import { ThemeProvider } from "@/components/main/theme-provider";
import "../globals.css";
import { Inter } from "next/font/google";
import { TailwindIndicator } from "@/components/main/tailwind-indicator";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
import { DashboardHeader } from "@/components/main/dashboard-header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/icon.png" sizes="any" />
        </head>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <DashboardHeader />
              <div className="flex-1">{children}</div>
            </div>
            <Analytics />
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
