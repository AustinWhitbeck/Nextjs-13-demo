import { compare } from "bcrypt";
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
        if (!credentials?.email || !credentials.password) {
          // NOTE: Null specifically tells Next Auth that the credentials provided were not correct
          // not that there wasn't a database connection made or an error.
          return null;
        }

        //  We know there is an email and password, try to find the user based on
        //  email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        console.log("user info n db", user);
        console.log("credentials value", credentials);

        // if we don't find a user
        if (!user) {
          return null;
        }

        // now we know there is a matched user, let's check to make sure the passwords match.
        // NOTE: Bcrypt continues to salt this, so you can't do a 1 to 1 comparison. Have to use bcrypts
        // hash comparison.

        // pass the user provided password as the 1st arg, and the password in the DB for the 2nd arg
        console.log("credentials password", credentials.password);
        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        // const isPasswordValid = credentials.password === user.password;

        console.log("isPasswordValid", isPasswordValid);

        if (!isPasswordValid) {
          return null;
        }

        const { id, email, name } = user;

        console.log("user from db info", user);

        return {
          id: id.toString(),
          email: email,
          name: name,
        };
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
