import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from './prisma'
import bcrypt from 'bcrypt'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        name: { label: 'name', type: 'text', placeholder: 'name' },
        password: { label: 'Password', type: 'password', placeholder: 'password' },
      },
      async authorize(credentials: any) {
        const user = await prisma.user.findUnique({
          where: { name: credentials?.name },
        })

        if (!user) return null

        const isValid = await bcrypt.compare(credentials?.password, user?.password)

        if (!isValid) {
          return null
        }

        return {
          id: user?.id,
          name: user?.name,
          email: user?.email,
        }
      },
    }),
  ],

  // for creating the jwt which is locked inside the cookie
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
      }
      return token
    },

    // for having the credentials that can be used at the frontend and
    // backend
    async session({ session, token }: { session: any; token: any }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
      }
      return session
    },
  },
  pages: {
    signIn: '/sign-in',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
