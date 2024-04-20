import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/app/libs/prismadb'
import bcrypt from 'bcrypt'
import { Adapter } from "next-auth/adapters";

export const authOptions:NextAuthOptions={
  adapter:<Adapter>PrismaAdapter(prisma),
  providers:[
    GoogleProvider({
        clientId:process.env.GOOGLE_CLIENT_ID as string,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
        clientId:process.env.GITHUB_ID as string,
        clientSecret:process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name:'credentials',
      credentials:{
        email:{type:'text',label:'email'},
        password:{type:'password',label:'password'}
      },
      async authorize(credentials){
        if(!credentials?.email || !credentials?.password){
          throw new Error('Invalid Credentials...');
        }

        const user=await prisma.user.findUnique({
          where:{
            email:credentials.email
          }
        }) ;

        if(!user || !user?.hashedPassword){
          throw new Error('Invalid Credentials');
        }

        const isCorrectPassword=await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )
        if(!isCorrectPassword){
          throw new Error('Invalid Credentials');
        }

        return user;
      }
    })
  ],
  pages:{
    signIn:"/"
  },
  debug:process.env.NODE_ENV ==='development',
  session:{
    strategy:'jwt'
  },
  secret:process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions); 