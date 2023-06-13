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

        // NOTE: use to compare current user vs. what's in the db
        // console.log("user info n db", user);
        // console.log("credentials value", credentials);

        // if we don't find a user
        if (!user) {
          return null;
        }

        // now we know there is a matched user, let's check to make sure the passwords match.
        // NOTE: Bcrypt continues to salt this, so you can't do a 1 to 1 comparison. Have to use bcrypts
        // hash comparison.

        // pass the user provided password as the 1st arg, and the password in the DB for the 2nd arg
        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        const { id, email, name, seePricing, awardQuotes } = user;

        console.log("user from db info", user);

        return {
          id: id.toString(),
          email: email,
          name: name,
          permissions: {
            seePricing,
            awardQuotes,
          },
        };
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      // User is only passed into the function, the first time the user logs in.
      console.log("JWT Callback", { token, user });

      // NOTE: typecasting as any, but example of adding our own interface into what a User object might be.
      // might be something like  MillSteelUser extends User, and add what we need.

      const u = user as unknown as any;

      if (user) {
        return {
          ...token,
          id: u.id,
          permissions: u.permissions,
        };
      }
      return token;
    },
    session: ({ session, token }) => {
      console.log("Session Callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          permissions: token.permissions,
        },
      };
    },
  },
};

// NOTE:

/*

    Next Auth handles all requests out of the same handler, but Next.js 13 routes look specifically for a GET and POST request, so we need to
    explicitly export it as both from here.

*/
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
