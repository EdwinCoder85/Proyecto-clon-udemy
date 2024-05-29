import prisma from "@/libs/prisma";
import { messages } from "@/utils/messages";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from '@/interfaces';

export async function POST(request: NextRequest) {
  try {
    const body: User = await request.json();
    const { email, username, password, role, image } = body;

    // check if email already exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { message: messages.error.emailExist },
        { status: 409 }
      );
    }
    // check if username already exists
    const existingUserByUsername = await prisma.user.findFirst({
      where: { username: username },
    });

    if (existingUserByUsername) {
      return NextResponse.json(
        { message: messages.error.userExist },
        { status: 409 }
      );
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role,
        image,
      },
    });
    // const { password: newUserPassword, ...rest } = newUser;
    const { password: _, ...user } = newUser;
    const token = jwt.sign({ data: user }, "secreto", {
      expiresIn: 86400,
    });

    const response = NextResponse.json(
      { newUser: user, message: messages.sucess.userCreated },
      { status: 201 }
    );

    response.cookies.set("auth_cookie", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default, error },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: messages.error.default, error },
        { status: 500 }
      );
    }
  }
}
