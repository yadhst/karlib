"use client";

import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

import { useMobileMenu } from "../mobile-menu-context";
import Button from "@/components/ui/button";
import { Show } from "@/components/utilities/conditional";

export default function MobileMenuToggler() {
  const { isExpanded, toggle } = useMobileMenu();

  return (
    <Button
      type="button"
      variant={isExpanded ? "destructive" : "ghost"}
      size="icon"
      className="rounded-full md:hidden"
      onClick={toggle}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isExpanded ? "expanded" : "collapsed"}
          initial={{ rotate: 0 }}
          animate={{ rotate: isExpanded ? 90 : 0 }}
          exit={{ rotate: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Show when={isExpanded} fallback={<Menu />}>
            <X />
          </Show>
        </motion.div>
      </AnimatePresence>
    </Button>
  );
}
