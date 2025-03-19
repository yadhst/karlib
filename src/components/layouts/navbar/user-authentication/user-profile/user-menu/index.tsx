"use client";

import useMediaQuery from "@/hooks/use-media-query";
import UserProfileContainer from "../../user-profile-container";
import DesktopProfileMenu from "./desktop-profile-menu";
import MobileProfileMenu from "./mobile-profile-menu";
import { Show } from "@/components/utilities/conditional";
import type { User } from "@/lib/database/schema";

type UserMenuProps = {
  children: React.ReactNode;
  user: User;
};
export default function UserMenu({ children, user }: UserMenuProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <UserProfileContainer className="max-md:absolute max-md:inset-x-0 max-md:bottom-0">
      <Show
        when={isMobile}
        fallback={
          <DesktopProfileMenu user={user}>{children}</DesktopProfileMenu>
        }
      >
        <MobileProfileMenu user={user}>{children}</MobileProfileMenu>
      </Show>
    </UserProfileContainer>
  );
}
