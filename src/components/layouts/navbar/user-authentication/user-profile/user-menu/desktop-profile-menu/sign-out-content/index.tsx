"use client";

import { useTransition } from "react";

import { signOut } from "@/actions/authentication";
import Button from "@/components/ui/button";
import {
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalClose,
} from "@/components/ui/modal";
import type { User } from "@/lib/database/schema";

export default function SignOutContent({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition();
  const handleSignOut = () => {
    startTransition(() => {
      signOut();
    });
  };

  return (
    <ModalContent className="sm:max-w-[425px]">
      <ModalHeader className="max-md:text-left">
        <ModalTitle>Apakah Anda yakin?</ModalTitle>
        <ModalDescription>Apakah Anda yakin ingin keluar?</ModalDescription>
      </ModalHeader>
      <ModalFooter className="max-md:pt-2">
        <Button
          type="button"
          variant="destructive"
          disabled={isPending}
          onClick={handleSignOut}
        >
          {isPending ? "Sedang Proses..." : "Keluar"}
        </Button>
        <ModalClose asChild>
          <Button type="button" variant="outline" disabled={isPending}>
            Batal
          </Button>
        </ModalClose>
      </ModalFooter>
    </ModalContent>
  );
}
