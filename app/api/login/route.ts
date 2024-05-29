import { signJwtAccessToken } from "@/libs/jwt";
import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { messages } from "@/utils/messages";
import { Login } from '@/interfaces';

export async function POST(request: NextRequest) {
  try {
    const body: Login = await request.json();

    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    try {
      if (user) {
        const passwordMatches = await bcrypt.compare(
          body.password,
          user.password || ""
        );

        if (passwordMatches) {
          const { password, ...userWithoutPass } = user;
          const token = signJwtAccessToken(userWithoutPass);
          const result = {
            ...userWithoutPass,
            token,
          };

          return NextResponse.json({
            id: result.id,
            name: result.username,
            email: result.email,
            accessToken: result.token,
          });
        }
      }
    } catch (error) {
      // Handle incorrect password or user not found
      return NextResponse.json(
        { message: messages.error.loginNotValid},
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default },
      { status: 500 }
    );
  }
}
