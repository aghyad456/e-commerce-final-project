import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const data = await res.json()
                if (data && data.message === "success") {
                    return {
                        id: data.user.email,
                        name: data.user.name,
                        email: data.user.email,
                        role: data.user.role,
                        token: data.token,
                    }
                }
                return null
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.token = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.token) {
                try {
                    const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
                        method: "GET",
                        headers: {
                            "token": token.token as string
                        }
                    });

                    const data = await res.json();

                    if (data.message !== "verified") {
                        return { ...session, user: undefined };
                    }

                    session.user.role = token.role as string;
                    session.user.token = token.token as string;
                } catch (error) {
                    return { ...session, user: undefined };
                    console.log(error)
                }
            }
            return session;
        },
    },
    pages: { 
        signIn: '/auth/login' 
    },
    secret: process.env.AUTH_SECRET
};