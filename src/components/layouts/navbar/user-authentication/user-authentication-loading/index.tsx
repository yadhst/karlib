import Skeleton from "@/components/ui/skeleton";
import UserProfileContainer from "../user-profile-container";

export default function UserAuthenticationLoading() {
  return (
    <UserProfileContainer className="max-md:absolute max-md:inset-x-0 max-md:bottom-0">
      <Skeleton className="h-16 w-full md:h-9 md:w-[170px] md:rounded-full" />
    </UserProfileContainer>
  );
}
