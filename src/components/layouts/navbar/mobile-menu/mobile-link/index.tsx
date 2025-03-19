"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { Show } from "@/components/utilities/conditional";

type MobileLinkProps = {
  href: string;
  label: string;
  className?: string;
};
export default function MobileLink({
  href,
  label,
  className,
}: MobileLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <div className="relative">
      <Link
        href={href}
        className={cn(
          "hover:bg-secondary/30 text-secondary-foreground inline-flex w-full rounded px-4 py-2.5 text-sm font-semibold",
          isActive && "text-primary",
          className,
        )}
      >
        {label}
      </Link>
      <Show when={isActive}>
        <motion.div
          layoutId="mobile-link-indicator"
          className="bg-primary absolute inset-y-2 -left-4 w-[3px] rounded-r-md"
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 30,
          }}
        />
      </Show>
    </div>
  );
}
