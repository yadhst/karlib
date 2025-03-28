"use client";

import { motion } from "motion/react";

export default function NavbarContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      layoutScroll
      className="fixed inset-x-0 top-0 z-50 overflow-hidden backdrop-blur-3xl backdrop-grayscale-100 backdrop-saturate-200"
    >
      {children}
    </motion.div>
  );
}
