declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        accessToken?: string
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id_token?: string
        provider?: string
        accessToken?: string
    }
}

export type { AuthOptions as NextAuthOptions } from "next-auth" 