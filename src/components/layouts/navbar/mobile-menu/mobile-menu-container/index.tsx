"use client";

import { useWindowSize } from "usehooks-ts";
import { motion, AnimatePresence } from "motion/react";
import { RemoveScroll } from "react-remove-scroll";

import { useMobileMenu } from "../mobile-menu-context";
import { Show } from "@/components/utilities/conditional";

export default function MobileMenuContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { height = 0 } = useWindowSize();
  const { isExpanded } = useMobileMenu();

  return (
    <RemoveScroll enabled={isExpanded} forwardProps>
      <AnimatePresence>
        <Show key={isExpanded ? "expanded" : "collapsed"} when={isExpanded}>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: height - 68 }}
            exit={{ height: 0 }}
            transition={{
              duration: 0.55,
              type: "tween",
              ease: [0.76, 0, 0.24, 1],
            }}
            className="flex h-0 flex-col justify-between gap-4 overflow-hidden md:hidden"
          >
            {children}
          </motion.div>
        </Show>
      </AnimatePresence>
    </RemoveScroll>
  );
}
