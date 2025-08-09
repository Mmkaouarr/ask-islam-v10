
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials){
        // Demo-only auth. Replace with real DB check in production.
        if (!credentials?.email) return null
        return { id: 1, name: credentials.email, email: credentials.email, pro: false }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.pro = user.pro || false
      return token
    },
    async session({ session, token }) {
      session.user.pro = token.pro || false
      return session
    }
  }
})
