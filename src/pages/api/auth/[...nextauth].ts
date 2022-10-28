import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../server/db/client';
import { env } from '../../../env/server.mjs';

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async session({ session, user }) {
      const foundAdmin = await prisma.admin.findUnique({
        where: {
          email: user.email!,
        },
      });

      if (session.user) {
        session.user.id = user.id;
        session.user.isAdmin = foundAdmin ? true : false;
      }

      return session;
    },
    async signIn({ user }) {
      const adminEmail = process.env.ADMIN_EMAIL;

      if (user.email !== adminEmail && user.email) {
        const foundInvitation = await prisma.invitation.findUnique({
          where: { email: user.email },
        });

        if (!foundInvitation) return false;
      }

      if (user.email === adminEmail) {
        const foundAdmin = await prisma.admin.findUnique({ where: { email: user.email } });
        if (!foundAdmin) await prisma.admin.create({ data: { email: user.email as string } });
      }

      return true;
    },
    async redirect() {
      return '/';
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),

    // ...add more providers here
  ],
  pages: {
    signIn: '/auth',
  },
};

export default NextAuth(authOptions);
