import { ChevronDown, ChevronUp } from "lucide-react";

import Button from "@/components/ui/button";
import UserMenu from "./user-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/lib/database/schema";

export default function UserProfile({ user }: { user: User }) {
  return (
    <UserMenu user={user}>
      <Button
        variant="outline"
        className="flex items-center gap-4 max-md:w-full max-md:py-6 md:rounded-full md:px-2"
      >
        <Avatar className="ring-border size-6 ring">
          <AvatarImage src={user.image} alt={`@${user.name}`} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <span className="max-w-50 truncate text-sm md:max-w-20">
          {user.name}
        </span>
        <ChevronDown className="size-4 max-md:hidden" />
        <ChevronUp className="size-4 md:hidden" />
      </Button>
    </UserMenu>
  );
}
