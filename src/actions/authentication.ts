"use server";

import {
  auth,
  signIn as authSignIn,
  signOut as authSignOut,
} from "@/lib/authentication/handler";

export async function signIn() {
  const session = await auth();
  if (session?.user) return;

  await authSignIn("google");
}

export async function signOut() {
  const session = await auth();
  if (!session?.user) return;

  await authSignOut();
}
