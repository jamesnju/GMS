import { error } from "console";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { json } from "stream/consumers";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "enter username.",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "enter password.",
        },
      },
      async authorize(credentials) {
        try {
          const user = {
            id: "1",
            name: "james",
            role: "admin",
            password: "pass",
          };

          if (
            credentials?.username === user.name &&
            credentials.password === user.password
          ) {
            const res = await fetch('www.http',{
                method: "POST",
                body: JSON.stringify(data),

            })
          } else {
            throw new Error("Invalid credential");
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
};
