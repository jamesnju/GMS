// pages/api/auth/[...nextauth].ts

import { loginUser } from "@/actions/Auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// The NextAuth configuration options
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
          // Log credentials to ensure they are passed correctly
          console.log("Received credentials:", credentials);

          // Call the loginUser function to authenticate the user
          const res = await loginUser({
            email: credentials?.email as string,
            password: credentials?.password as string,
            name: "", // Assuming no name needed for login, set it as empty string
          });

          console.log("Response from loginUser:", res); // Log the response from the backend

          if (res?.user && res?.token) {
            // Return necessary user details for NextAuth JWT token
            const { id, email, role, name } = res.user;
            return { id, email, role, name };
          }

          console.error("Login failed or invalid response:", res);
          return null; // Return null if login fails
        } catch (error) {
          console.error("Authorization error:", error); // Log error during authorization
          return null; // Return null if there was an error during login
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth", // Custom sign-in page path
  },
  callbacks: {
    // Callback to handle JWT creation after successful login
    async jwt({ token, user }) {
      if (user) {
        token.id = Number(user.id); // Store user details in JWT token
        token.email = user.email;
        token.role = user.role;
        token.name = user.name;
      }
      console.log("JWT Token:", token); // Log JWT token for debugging
      return token;
    },
    // Callback to handle the session data when retrieving session info
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        role: token.role,
        name: token.name,
      };
      console.log("Session object:", session); // Log session data for debugging
      return session;
    },
  },
};
