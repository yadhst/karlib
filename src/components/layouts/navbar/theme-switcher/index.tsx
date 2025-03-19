"use client";

import { useTheme } from "next-themes";
import { motion } from "motion/react";
import { Moon, Sun } from "lucide-react";

import Button from "@/components/ui/button";

const IconVariants = {
  dark: {
    rotate: 0,
  },
  light: {
    rotate: 180,
  },
};

export default function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={toggleTheme}
    >
      <motion.span
        variants={IconVariants}
        initial={{ rotate: 0 }}
        animate={resolvedTheme}
      >
        <Moon className="hidden size-4 dark:block" />
        <Sun className="size-4 dark:hidden" />
      </motion.span>
    </Button>
  );
}
