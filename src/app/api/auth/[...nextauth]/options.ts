import { loginUser } from "@/actions/Auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      authorize: async (credentials) => {
        try {
          const res = await loginUser({
            email: credentials?.email as string,
            password: credentials?.password as string,
          });

          console.log(res, "Response from loginUser");

          if (res?.user && res?.token) {
            const { id, email, role, name}=res.user;

            return { id, email, role,name};
          }

          console.error("Login failed or invalid response:", res);
          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as number,
        token.email = user.email;
        token.role = user.role;
        token.name = user.name;
      }
      console.log("JWT Token:", token);
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as number,
        email: token.email as string,
        role: token.role as string,
        name: token.name as string,
      };
      console.log("Session object:", session);
      return session;
    },
  },
};
