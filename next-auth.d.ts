import NextAuth, { DefaultSession } from 'next-auth';

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      role: string;
      image: string;
      token: string;
      subscriptionId?: string;
    } & DefaultSession["user"];
  }
}