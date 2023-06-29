import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

import User from "@/models/User";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        //Check if the user exists.
        await dbConnect();

        try {
          const user = await User.findOne({
            email: credentials.email,
          });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),

    
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
   
    async session({session, token, user}) {
      await dbConnect();

      const dbUser = await User.findOne({
        email: session.user.email,
      });
       
      session.user = dbUser;
      return session;
    },
  },
  pages: {
    error: "/login",
  },

});

export { handler as GET, handler as POST };
