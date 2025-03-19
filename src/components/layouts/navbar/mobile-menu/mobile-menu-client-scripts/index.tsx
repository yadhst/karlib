"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { useMobileMenu } from "../mobile-menu-context";

export default function MobileMenuClientScripts() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { collapse } = useMobileMenu();

  useEffect(() => {
    collapse();
  }, [pathname, searchParams, collapse]);

  useEffect(() => {
    const controller = new AbortController();

    window.addEventListener(
      "resize",
      () => {
        const tabletBreakpoint = window
          .getComputedStyle(document.documentElement)
          .getPropertyValue("--breakpoint-md");

        const tabletMedia = window.matchMedia(
          `(min-width: ${tabletBreakpoint})`,
        );

        if (tabletMedia.matches) collapse();
      },
      { signal: controller.signal },
    );

    return () => controller.abort("cleanup listener(s)");
  }, [collapse]);

  return null;
}
