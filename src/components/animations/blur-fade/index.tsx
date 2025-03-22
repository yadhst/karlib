"use client";

import { useRef, useMemo } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  UseInViewOptions,
  Variants,
} from "motion/react";

type BlurFadeProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
    variant?: {
      hidden: { y: number };
      visible: { y: number };
    };
    duration?: number;
    delay?: number;
    offset?: number;
    direction?: "up" | "down" | "left" | "right";
    inView?: boolean;
    inViewMargin?: UseInViewOptions["margin"];
    blur?: string;
  };
export default function BlurFade<T extends React.ElementType = "div">({
  as = "div" as T,
  variant,
  duration = 0.4,
  delay = 0,
  offset = 6,
  direction = "down",
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
  ...props
}: BlurFadeProps<T>) {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const Component = useMemo(() => motion.create(as), [as]);

  const isInView = !inView || inViewResult;
  const defaultVariants: Variants = {
    hidden: {
      [direction === "left" || direction === "right" ? "x" : "y"]:
        direction === "right" || direction === "down" ? -offset : offset,
      opacity: 0,
      filter: `blur(${blur})`,
    },
    visible: {
      [direction === "left" || direction === "right" ? "x" : "y"]: 0,
      opacity: 1,
      filter: `blur(0px)`,
    },
  };

  const combinedVariants = variant || defaultVariants;
  return (
    <AnimatePresence>
      <Component
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="hidden"
        variants={combinedVariants}
        transition={{
          delay: 0.04 + delay,
          duration,
          ease: "easeOut",
        }}
        {...props}
      />
    </AnimatePresence>
  );
}
