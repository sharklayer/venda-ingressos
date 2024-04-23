import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import { checkUserPassword, getUserByEmail } from "@/repo/user.repo.mjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                senha: {  label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                if (credentials?.email && credentials?.senha) { 
                    let ok = await checkUserPassword(credentials?.email, credentials?.senha);
                    if (ok) {
                        let { senha, ...user} = await getUserByEmail(credentials.email);
                        return user;
                    } 
                }
                return null;
            }
        })
    ],
    jwt: {
        secret: process.env.JWT_SECRET
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/signin',
        signOut: '/auth/signout',
    },
    events: {
        async signIn(message) {
            console.log('signIn', message)
        },
        async signOut(message) {
            console.log('signOut', message)
        },
        async session(message) {
            console.log('session', message)
        },
        async error(message) {
            console.log('error', message)
        }
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.nome = user.nome;
                token.sobrenome = user.sobrenome;
                token.admin = user.admin;
            }
            return token
        },
        async session({session, token }) {
            session.user = {};
            session.user.id = token?.id;
            session.user.email = token?.email;
            session.user.nome = token?.nome;
            session.user.sobrenome = token?.sobrenome;
            session.user.admin = token?.admin;
            return session;
        }
    }
}

export default NextAuth(authOptions)
