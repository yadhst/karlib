import { auth } from "@/lib/authentication/handler";
import Await from "@/components/utilities/await";
import UserAuthenticationLoading from "./user-authentication-loading";
import UnauthenticatedFallback from "./unauthenticated-fallback";
import UserProfile from "./user-profile";
import { Show } from "@/components/utilities/conditional";

export default function UserAuthentication() {
  const authPromises = auth().then((session) => session?.user);

  return (
    <Await promise={authPromises} fallback={<UserAuthenticationLoading />}>
      {(user) => (
        <Show when={!!user} fallback={<UnauthenticatedFallback />}>
          <UserProfile user={user!} />
        </Show>
      )}
    </Await>
  );
}
