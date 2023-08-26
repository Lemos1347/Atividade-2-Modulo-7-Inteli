import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface Credentials {
  email: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as Credentials;
        try {
          const response = await fetch("http://backend:3001/auth/login", {
            method: "POST",
            cache: "no-cache",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
          });

          if (response.status === 200) {
            const jsonResponse = await response.json();

            const user_response = await fetch("http://backend:3001/user/", {
              method: "GET",
              cache: "no-cache",
              headers: {
                Authorization: `Bearer ${jsonResponse.access_token}`,
              },
            });

            if (user_response.status === 200) {
              const user = await user_response.json();

              return {
                ...jsonResponse,
                name: user.name,
                email: user.email,
                // TODO:
                roles: user.roles,
              };
            } else {
              return null;
            }
          } else {
            return null;
          }
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // user is what comes from the authorize function
    // token is what we utilyze in react to authenticate
    async jwt({ token, user }) {
      if (user) {
        // @ts-ignore
        token.accessToken = user.access_token;
        token = { ...token, roles: (user as any).roles };
      }
      return token;
    },
    // @ts-ignore
    async session({ session, token }) {
      if (token != null) {
        session.accessToken = token.accessToken;
      }
      return session;
      // // @ts-ignore
      // let updatedSession;
      // await fetch("http://localhost:3001/user/", {
      //   method: "GET",
      //   cache: "no-cache",
      //   // @ts-ignore
      //   headers: {
      //     Authorization: `Bearer ${token.accessToken}`,
      //   },
      // })
      //   .then((res) => {
      //     console.log("RES: ", res.status);
      //     if (res.status === 200) {
      //       updatedSession = {
      //         ...session,
      //         accessToken: token.accessToken,
      //       };
      //       // session.accessToken = token.accessToken;
      //     } else {
      //       updatedSession = {};
      //     }
      //   })
      //   .catch((e) => {
      //     updatedSession = {};
      //   });
      // return updatedSession;
    },
  },
  session: {
    maxAge: 60 * 60 * 2, // A sessão expirará após 2 horas
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
