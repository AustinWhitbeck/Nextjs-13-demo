import NextAuth from "next-auth";

type Permissions = {
  seePricing: boolean;
  awardQuotes: boolean;
};

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      permissions: Permissions;
    };
  }
}
