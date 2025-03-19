"use client";

import { useEffect, useRef } from "react";

export default function NavbarBorder() {
  const borderRef = useRef<React.ComponentRef<"hr">>(null);

  useEffect(() => {
    const controller = new AbortController();

    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 0) {
          borderRef.current?.classList.replace("opacity-0", "opacity-100");
        } else {
          borderRef.current?.classList.replace("opacity-100", "opacity-0");
        }
      },
      { signal: controller.signal },
    );

    return () => controller.abort("cleanup listener(s)");
  }, []);

  return (
    <hr
      ref={borderRef}
      className="border-border opacity-0 transition-opacity duration-300 ease-in-out"
    />
  );
}
