import { prisma } from "../../../lib/prisma";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        // This is the password we are looking to validate against
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Handle auth!

        // Mock auth for now
        const user = { id: "1", name: "Austin", email: "test@test.com" };
        return user;
      },
    }),
  ],
};

// NOTE:

/*

    Next Auth handles all requests out of the same handler, but Next.js 13 routes look specifically for a GET and POST request, so we need to
    explicitly export it as both from here.

*/
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
