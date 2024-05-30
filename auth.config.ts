import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";

export const authConfig: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt( { token, user, trigger, session } ) {
      if ( user ) {
        token = { ...token, ...user };
      }

      if ( trigger === "update" && session?.user ) {
        token.user = {
          ...( token.user || {} ),
          ...session.user,
          subscriptionId: session.user.subscriptionId,
        };
      }

      return token;
    },
    async session( { session, token } ) {

      if ( token ) {
        session.user = {
          ...session.user,
          ...token,
        } as any;
      }

      // Si session.user.id existe, buscar el usuario en la base de datos
      if ( session.user?.id ) {
        const userFromDatabase = await prisma.user.findUnique( {
          where: { id: session.user.id },
          select: { role: true }, // Seleccionar solo el campo de rol
        } );

        // Si no se encontró el usuario en la base de datos o no existe session.user.id
        if ( !session.user?.role ) {
          session.user.role = "user"; // Asignar un rol predeterminado
          const userWithEmail = await prisma.user.findUnique( {
            where: { email: session.user.email },
            select: { id: true },
          } );

          // Si se encontró el usuario con el correo electrónico, asignar su id
          if ( userWithEmail ) {
            session.user.id = userWithEmail.id;
          }
        }

        // Si se encontró el usuario en la base de datos, asignar su rol
        if ( userFromDatabase ) {
          session.user.role = userFromDatabase.role;
        }
      }

      return session;
    },
    async signIn( { account, profile } ) {
      if ( account?.provider === "google" ) {
        if ( profile?.email && profile.name ) {
          // Verificar si el usuario ya existe en la base de datos
          let userFound = await prisma.user.findUnique( {
            where: { email: profile.email },
          } );
          // Si el usuario no existe, crear uno nuevo
          if ( !userFound ) {
            await prisma.user.create( {
              data: {
                username: profile.name,
                email: profile.email,
                role: "user",
                image: profile.picture,
              },
            } );
          } else {
            // Si el usuario ya existe, actualizar la información
            userFound = await prisma.user.update( {
              where: { email: profile.email },
              data: {
                username: profile.name,
                email: profile.email,
                role: "user",
                image: profile.picture,
                // googleAccountId: account.id, // Actualizar el ID de la cuenta de Google
              },
            } );
          }
        }
      }
      if ( account?.provider === "github" ) {
        if ( profile?.email && profile.name ) {
          // Verificar si el usuario ya existe en la base de datos
          let userFound = await prisma.user.findUnique( {
            where: { email: profile.email },
          } );
          // Si el usuario no existe, crear uno nuevo
          // Si el usuario no existe, crear uno nuevo
          if ( !userFound ) {
            await prisma.user.create( {
              data: {
                username: profile.name,
                email: profile.email,
                role: "user",
                image: profile.picture || profile.avatar_url || null,
              },
            } );
          } else {
            // Si el usuario ya existe, actualizar la información
            userFound = await prisma.user.update( {
              where: { email: profile.email },
              data: {
                username: profile.name,
                email: profile.email,
                role: "user",
                image: profile.picture,
                // googleAccountId: account.id, // Actualizar el ID de la cuenta de Google
              },
            } );
          }
        }
      }
      return true;
    },
  },
  providers: [
    Credentials( {
      name: "Credentials",
      credentials: {},
      async authorize( credentials: any ) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // BUSCAR CORREO
        const userFound = await prisma.user.findUnique( {
          where: { email },
        } );

        if ( !userFound ) throw new Error( "Usuario no encontrado" );

        let matchPassword = false;
        // COMPARAR LAS CONTRASEÑAS
        if ( userFound && userFound.password ) {
          matchPassword = await bcrypt.compare( password, userFound.password );
          // rest of your code
        }

        if ( !matchPassword )
          throw new Error(
            "Contraseña incorrecta. Por favor, inténtalo de nuevo."
          );

        const { password: _, ...resto } = userFound;
        return resto;
      },
    } ),
    GoogleProvider( {
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    } ),
    GitHubProvider( {
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    } ),
    FacebookProvider( {
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    } ),
  ],
};

export const { handlers, auth, signIn, signOut } = NextAuth( authConfig );
