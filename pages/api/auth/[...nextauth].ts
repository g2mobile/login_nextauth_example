import NextAuth from "next-auth"
import { NextApiRequest, NextApiResponse } from "next";
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { signIn } from "next-auth/react";

const prisma = new PrismaClient()

/*type User1 = {
  id: string
  name: string
  image: string
};*/

const options: any = {
  //adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {

        //console.log('--------> CHEGOU: ', credentials?.username);

        const email: any = credentials?.email
        const password: any = credentials?.password

        const _user = await prisma.user.findFirst({
          where: {
            email: email,
            password: password
          },
          /*select: {
            id: true,
            name: true,
            email: true,
            image: true,
            isActive: true,
          }*/
        });



        if (_user !== null) {
          return _user;
        }
        else {
          return null;
        }

      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    //maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.JWT_SECRET,

  callbacks: {

    async signIn({ user, account, profile, email, credentials }) {

      //console.log('signIn',user);

      if (typeof user.id !== typeof undefined) {
        if (user.isActive) {
          return user;
        }
        else {
          return false;
        }
      }
      else {
        return false;
      }
    },

    /*async session({ session, user, token }) {
      //console.log("session",session);
      if (user != null) {
        session.user = user;
      }
      return token;
    },*/

    async jwt({ token, user, account, profile, isNewUser }) {
      
      if (typeof user != typeof undefined) {
        token.user = user;
      }

      const _user = await prisma.user.findFirst({
        where: {
          id: token.user.id,
          password: token.user.password,
          isActive: true
        }
      });

      if(!_user)
        return null

      return token

    }

  }

};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);