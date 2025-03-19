"use client";

import { Fragment } from "react";
import Link from "next/link";
import { History, BookmarkCheck, LogOut } from "lucide-react";

import Button from "@/components/ui/button";
import Separator from "@/components/ui/separator";
import Each from "@/components/utilities/each";
import SignOutContent from "./sign-out-content";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DrawerTabs,
  DrawerTabsTrigger,
  DrawerTabsContent,
  type Path,
} from "@/components/ui/drawer/drawer-tabs";
import type { User } from "@/lib/database/schema";

const DRAWER_CONTENTS = [
  {
    path: "/",
    Component: MainContent,
  },
  {
    path: "/sign-out",
    Component: SignOutContent,
  },
];

type MobileProfileMenuProps = {
  children: React.ReactNode;
  user: User;
};
export default function MobileProfileMenu({
  children,
  user,
}: MobileProfileMenuProps) {
  return (
    <Drawer>
      <DrawerTrigger className="cursor-pointer" asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTabs>
          <Each of={DRAWER_CONTENTS}>
            {({ path, Component }) => (
              <DrawerTabsContent key={path} path={path as Path}>
                <Component user={user} />
              </DrawerTabsContent>
            )}
          </Each>
        </DrawerTabs>
      </DrawerContent>
    </Drawer>
  );
}

function MainContent({ user }: { user: User }) {
  return (
    <Fragment>
      <DrawerHeader className="sm:text-center">
        <DrawerTitle className="text-muted-foreground truncate text-sm">
          👋 Halo, {user.name}!
        </DrawerTitle>
      </DrawerHeader>
      <div className="mb-4 grid gap-4 px-4">
        <div className="grid gap-1">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href={`/user/${user.id}/history`}>
              <History className="mr-2 size-4" />
              Histori
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href={`/user/${user.id}/bookmark`}>
              <BookmarkCheck className="mr-2 size-4" />
              Tersimpan
            </Link>
          </Button>
        </div>
        <Separator />
        <DrawerTabsTrigger
          path="/sign-out"
          variant="ghost"
          className="hover:bg-destructive! text-destructive hover:text-destructive-foreground! w-full justify-start"
        >
          <LogOut className="mr-2 size-4" />
          Keluar
        </DrawerTabsTrigger>
      </div>
    </Fragment>
  );
}
