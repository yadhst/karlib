import type { Metadata } from "next";

import "@/styles/globals.css";
import { inter, merriweather } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import Providers from "./providers";

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
    <html lang="id">
      <body className={cn(inter.className, merriweather.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
