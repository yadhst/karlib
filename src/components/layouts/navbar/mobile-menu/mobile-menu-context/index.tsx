"use client";

import { createContext, useContext, useState } from "react";

type MobileMenuContextData = {
  isExpanded: boolean;
  toggle: () => void;
  collapse: () => void;
  expand: () => void;
};
const MobileMenuContext = createContext<MobileMenuContextData | null>(null);

export function MobileMenuProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggle = () => setIsExpanded((prev) => !prev);
  const collapse = () => setIsExpanded(false);
  const expand = () => setIsExpanded(true);

  return (
    <MobileMenuContext.Provider
      value={{ isExpanded, toggle, collapse, expand }}
    >
      {children}
    </MobileMenuContext.Provider>
  );
}

export function useMobileMenu() {
  const context = useContext(MobileMenuContext);
  if (!context) {
    throw new Error("useMobileMenu must be used within a MobileMenuProvider");
  }

  return context;
}
