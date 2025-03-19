"use client";

import { useMemo, useRef } from "react";
import { motion, useInView } from "motion/react";

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const childVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

type Props<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
};
export function FupContainer<T extends React.ElementType = "div">({
  as = "div" as T,
  inView = true,
  ...props
}: Props<T> & { inView?: boolean }) {
  const containerRef = useRef(null);
  const inViewResult = useInView(containerRef, { margin: "-5px" });
  const Component = useMemo(() => motion.create(as), [as]);

  const isInView = !inView || inViewResult;

  return (
    <Component
      ref={containerRef}
      variants={containerVariants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      {...props}
    />
  );
}

export function FupChild<T extends React.ElementType = "div">({
  as = "div" as T,
  ...props
}: Props<T>) {
  const Component = useMemo(() => motion.create(as), [as]);
  return <Component variants={childVariants} {...props} />;
}
