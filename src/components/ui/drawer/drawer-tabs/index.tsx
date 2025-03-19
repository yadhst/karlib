"use client";

import { createContext, useContext, useRef, useState } from "react";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import {
  motion,
  AnimatePresence,
  type MotionProps,
  type Variants,
} from "motion/react";
import { Tabs } from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";
import Button from "@/components/ui/button";

export type Direction = "forward" | "backward";
export type Path = `/${string}`;
type DrawerTabsContextData = {
  direction: Direction;
  path: Path;
  push: (path: Path) => void;
  pop: () => void;
};
const DrawerTabsContext = createContext<DrawerTabsContextData | null>(null);

const SLIDE_VARIANTS = {
  enter: (direction: Direction) => ({
    x: direction === "forward" ? 300 : -300,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: Direction) => ({
    x: direction === "forward" ? -300 : 300,
    opacity: 0,
  }),
} satisfies Variants;

function useDrawerTabs() {
  const context = useContext(DrawerTabsContext);
  if (!context) {
    throw new Error("useDrawerTabs must be used within a DrawerTabs");
  }

  return context;
}

type DrawerTabsProps = Omit<
  React.ComponentPropsWithRef<typeof Tabs>,
  "defaultValue" | "value" | "onValueChange"
> & {
  defaultPath?: Path;
  path?: Path;
  onPathChange?: (path: Path) => void;
};
export function DrawerTabs({
  children,
  className,
  defaultPath = "/",
  path,
  onPathChange,
  ...props
}: DrawerTabsProps) {
  const [direction, setDirection] = useState<Direction>("forward");
  const [value = "/", setValue] = useControllableState({
    prop: path,
    defaultProp: defaultPath,
    onChange: onPathChange,
  });

  const history = useRef<Path[]>([value]);
  const push = (path: Path) => {
    setDirection("forward");
    history.current = [...history.current, path];

    setValue(history.current.at(-1));
  };

  const pop = () => {
    setDirection("backward");
    history.current = history.current.slice(0, -1);

    setValue(history.current.at(-1));
  };

  return (
    <DrawerTabsContext.Provider value={{ direction, path: value, push, pop }}>
      <Tabs
        defaultValue={defaultPath}
        value={value}
        onValueChange={setValue as React.Dispatch<React.SetStateAction<string>>}
        className={cn("relative flex h-auto flex-col", className)}
        {...props}
      >
        <AnimatePresence custom={direction} mode="wait">
          {children}
        </AnimatePresence>
      </Tabs>
    </DrawerTabsContext.Provider>
  );
}

type DrawerTabsTriggerProps = React.ComponentPropsWithRef<typeof Button> & {
  path: Path | "--go-back";
};
export function DrawerTabsTrigger({
  path,
  onClick,
  ...props
}: DrawerTabsTriggerProps) {
  const { push, pop } = useDrawerTabs();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    return path === "--go-back" ? pop() : push(path);
  };

  return <Button onClick={handleClick} {...props} />;
}

type DrawerTabsContentProps = Omit<
  React.ComponentPropsWithRef<typeof motion.div>,
  keyof MotionProps
> & {
  children: React.ReactNode;
  path: Path;
};
export function DrawerTabsContent({
  children,
  path,
  ...props
}: DrawerTabsContentProps) {
  const { path: currentPath, direction } = useDrawerTabs();
  const isSelected = currentPath === path;

  if (!isSelected) return null;
  return (
    <motion.div
      key={path}
      custom={direction}
      variants={SLIDE_VARIANTS}
      initial="enter"
      animate="animate"
      exit="exit"
      transition={{
        duration: 0.3,
        type: "tween",
        ease: [0.76, 0, 0.24, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
