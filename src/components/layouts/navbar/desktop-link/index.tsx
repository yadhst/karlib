"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { Show } from "@/components/utilities/conditional";

type DesktopLinkProps = {
  href: string;
  label: string;
  className?: string;
};
export default function DesktopLink({
  href,
  label,
  className,
}: DesktopLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <div className="relative flex justify-center">
      <Link
        href={href}
        className={cn(
          "hover:text-primary text-sm font-light transition-colors duration-150 ease-linear",
          isActive && "text-primary font-semibold",
          className,
        )}
      >
        {label}
      </Link>
      <Show when={isActive}>
        <motion.div
          layoutId="desktop-underline"
          className="bg-primary absolute -bottom-1 size-1 rounded-full"
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
        />
      </Show>
    </div>
  );
}
