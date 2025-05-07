// auth.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/mongodb";
import { comparePassword } from "@/lib/hash";
import User from "./database/user.model";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        await connectToDatabase();
        const user = await User.findOne({ email });
        if (!user || !user.passwordHash) return null;

        const isValid = await comparePassword(password, user.passwordHash);
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectToDatabase();
      const existing = await User.findOne({ email: user.email });
      if (!existing && account?.provider === "google") {
        await User.create({
          name: profile?.name,
          email: profile?.email,
          phoneNumber: "0000000000",
        });
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.sub!;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.AUTH_SECRET,
});
