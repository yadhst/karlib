import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "@/lib/database/instance";
import {
  user,
  account,
  session,
  verificationToken,
  authenticator,
  type User,
} from "@/lib/database/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: process.env.NODE_ENV === "development",
  trustHost: true,
  adapter: DrizzleAdapter(db, {
    usersTable: user,
    accountsTable: account,
    sessionsTable: session,
    verificationTokensTable: verificationToken,
    authenticatorsTable: authenticator,
  }),
  providers: [Google],
});

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
