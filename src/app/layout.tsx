import type { Metadata } from "next";

import "@/styles/globals.css";
import { inter, merriweather } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import Providers from "./providers";
import Navbar from "@/components/layouts/navbar";
import Footer from "@/components/layouts/footer";

export const metadata: Metadata = {
  title: "Karlib",
  description:
    "A digital library for written works from Pesantren Persatuan Islam 112 Bogor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          merriweather.variable,
          "flex min-h-screen flex-col antialiased",
        )}
      >
        <Providers>
          <Navbar />
          <main className="w-full flex-1 py-4 pt-[calc(--spacing(4)+var(--navbar-height))]">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
