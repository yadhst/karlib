import { signIn } from "@/actions/authentication";
import Button from "@/components/ui/button";
import UserProfileContainer from "../user-profile-container";

export default function UnauthenticatedFallback() {
  return (
    <UserProfileContainer className="max-md:absolute max-md:inset-x-4 max-md:bottom-4">
      <Button className="max-md:w-full" onClick={signIn}>
        Masuk
      </Button>
    </UserProfileContainer>
  );
}
