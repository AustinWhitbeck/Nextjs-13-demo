import NextAuth, { DefaultSession } from "next-auth";

type Permissions = {
  seePricing: boolean;
  awardQuotes: boolean;
};

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    user: {
      permissions: Permissions;
    } & DefaultSession["user"];
  }
}
