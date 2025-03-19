"use client";

import { createContext, useContext } from "react";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

import { cn } from "@/lib/utils";
import useMediaQuery from "@/hooks/use-media-query";
import { Show } from "@/components/utilities/conditional";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../dialog";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "../drawer";

type ModalContextData = {
  open: boolean;
  isMobile: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};
const ModalContext = createContext<ModalContextData | null>(null);

function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a Modal");
  }

  return context;
}

export function Modal({
  defaultOpen,
  open: openProp,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof Drawer>) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [open = false, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  return (
    <ModalContext.Provider value={{ isMobile, open, setOpen }}>
      <Show
        when={isMobile}
        fallback={<Dialog open={open} onOpenChange={setOpen} {...props} />}
      >
        <Drawer open={open} onOpenChange={setOpen} autoFocus {...props} />
      </Show>
    </ModalContext.Provider>
  );
}

export function ModalTrigger({
  ...props
}: React.ComponentPropsWithRef<typeof DrawerTrigger>) {
  const { isMobile } = useModal();

  return (
    <Show when={isMobile} fallback={<DialogTrigger {...props} />}>
      <DrawerTrigger {...props} />
    </Show>
  );
}

export function ModalContent({
  ...props
}: React.ComponentPropsWithRef<typeof DrawerContent>) {
  const { isMobile } = useModal();

  return (
    <Show when={isMobile} fallback={<DialogContent {...props} />}>
      <DrawerContent {...props} />
    </Show>
  );
}

export function ModalHeader({
  ...props
}: React.ComponentPropsWithRef<typeof DrawerHeader>) {
  const { isMobile } = useModal();

  return (
    <Show when={isMobile} fallback={<DialogHeader {...props} />}>
      <DrawerHeader {...props} />
    </Show>
  );
}

export function ModalTitle({
  ...props
}: React.ComponentPropsWithRef<typeof DrawerTitle>) {
  const { isMobile } = useModal();

  return (
    <Show when={isMobile} fallback={<DialogTitle {...props} />}>
      <DrawerTitle {...props} />
    </Show>
  );
}

export function ModalDescription({
  ...props
}: React.ComponentPropsWithRef<typeof DrawerDescription>) {
  const { isMobile } = useModal();

  return (
    <Show when={isMobile} fallback={<DialogDescription {...props} />}>
      <DrawerDescription {...props} />
    </Show>
  );
}

export function ModalBody({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("max-md:px-4", className)} {...props} />;
}

export function ModalFooter({
  ...props
}: React.ComponentPropsWithRef<typeof DrawerFooter>) {
  const { isMobile } = useModal();

  return (
    <Show when={isMobile} fallback={<DialogFooter {...props} />}>
      <DrawerFooter {...props} />
    </Show>
  );
}

export function ModalClose({
  ...props
}: React.ComponentPropsWithRef<typeof DrawerClose>) {
  const { isMobile } = useModal();

  return (
    <Show when={isMobile} fallback={<DialogClose {...props} />}>
      <DrawerClose {...props} />
    </Show>
  );
}
