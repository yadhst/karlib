"use client";

import { Fragment, useTransition } from "react";

import { signOut } from "@/actions/authentication";
import Button from "@/components/ui/button";
import {
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { DrawerTabsTrigger } from "@/components/ui/drawer/drawer-tabs";
import type { User } from "@/lib/database/schema";

export default function SignOutContent({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition();
  const handleSignOut = () => {
    startTransition(() => {
      signOut();
    });
  };

  return (
    <Fragment>
      <DrawerHeader className="text-left">
        <DrawerTitle>Apakah Anda yakin?</DrawerTitle>
        <DrawerDescription>Apakah Anda yakin ingin keluar?</DrawerDescription>
      </DrawerHeader>
      <DrawerFooter className="pt-2">
        <Button
          type="button"
          variant="destructive"
          disabled={isPending}
          onClick={handleSignOut}
        >
          {isPending ? "Sedang Proses..." : "Keluar"}
        </Button>
        <DrawerTabsTrigger
          path="--go-back"
          type="button"
          variant="outline"
          disabled={isPending}
        >
          Batal
        </DrawerTabsTrigger>
      </DrawerFooter>
    </Fragment>
  );
}
