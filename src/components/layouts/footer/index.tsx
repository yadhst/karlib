"use client";

import Link from "next/link";

import BrandWithTir from "@/components/icons/brand-icon/with-text-in-right";
import Button from "@/components/ui/button";
import Each from "@/components/utilities/each";
import { FupContainer, FupChild } from "@/components/animations/fade-in-up";

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground border-border overflow-hidden border-t text-sm">
      <FupContainer className="layout-container flex flex-col items-center gap-4 py-8 md:flex-row md:justify-between md:py-4">
        <FupChild className="flex items-center gap-2">
          <BrandWithTir className="h-auto w-50 md:w-26" />
        </FupChild>
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <FupChild as="p">
            &copy; {new Date().getFullYear()} Karlib. All rights reserved.
          </FupChild>
          <FupChild as="nav" className="flex gap-4">
            <Each of={["Terms", "Privacy"]}>
              {(item) => (
                <Button
                  key={item}
                  variant="link"
                  size="sm"
                  className="p-0"
                  asChild
                >
                  <Link href={`/${item.toLowerCase()}`}>{item}</Link>
                </Button>
              )}
            </Each>
          </FupChild>
        </div>
      </FupContainer>
    </footer>
  );
}
