"use client";

import { motion, AnimatePresence, type HTMLMotionProps } from "motion/react";

import useMediaQuery from "@/hooks/use-media-query";
import { useMobileMenu } from "../../mobile-menu/mobile-menu-context";
import { Show } from "@/components/utilities/conditional";

export default function UserProfileContainer({
  children,
  ...props
}: HTMLMotionProps<"div">) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { isExpanded } = useMobileMenu();

  const shouldRender = !isMobile || isExpanded;
  return (
    <AnimatePresence>
      <Show key={shouldRender ? "render" : "hide"} when={shouldRender}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: isMobile ? 0.5 : 0,
            type: "tween",
            ease: [0.76, 0, 0.24, 1],
          }}
          {...props}
        >
          {children}
        </motion.div>
      </Show>
    </AnimatePresence>
  );
}
