import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "What typefaces",
  description: "What fonts you have?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo-line.svg" sizes="any" />
      </head>
      <body
        className={cn(
          inter.className,
          "w-full h-screen selection:bg-stone-900 selection:text-white",
          "scroll-smooth transform-gpu",
          "dark:bg-stone-950 dark:text-white"
        )}
      >
        {children}
      </body>
      <Toaster />
    </html>
  );
}
