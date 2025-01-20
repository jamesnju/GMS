import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: number;
    role: string; // Add role property
    email: string;
  }

  interface Session {
    user: {
      id: number;
      role: string;
      email: string;

    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    role: string;
    email: string;

  }
}
