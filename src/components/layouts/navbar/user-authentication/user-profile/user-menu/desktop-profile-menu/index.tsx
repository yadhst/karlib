"use client";

import Link from "next/link";
import { History, BookmarkCheck, LogOut } from "lucide-react";

import SignOutContent from "./sign-out-content";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Modal, ModalTrigger } from "@/components/ui/modal";
import type { User } from "@/lib/database/schema";

type DesktopProfileMenuProps = {
  children: React.ReactNode;
  user: User;
};
export default function DesktopProfileMenu({
  children,
  user,
}: DesktopProfileMenuProps) {
  return (
    <Modal>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer" asChild>
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="text-muted-foreground truncate text-xs">
            👋 Halo, {user.name}!
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href={`/user/${user.id}/history`}>
                <History className="mr-2 size-4" />
                Histori
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/user/${user.id}/bookmark`}>
                <BookmarkCheck className="mr-2 size-4" />
                Tersimpan
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <ModalTrigger asChild>
            <DropdownMenuItem className="hover:bg-destructive! text-destructive hover:text-destructive-foreground!">
              <LogOut className="mr-2 size-4" />
              Keluar
            </DropdownMenuItem>
          </ModalTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <SignOutContent />
    </Modal>
  );
}
