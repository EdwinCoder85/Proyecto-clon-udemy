import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { messages } from "@/utils/messages";

interface Params {
  params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Params) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: messages.error.userNotFound },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { user: user, message: messages.sucess.userObtained },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function DELETE(request: Request, { params: { id } }: Params) {
  try {
    const userDeleted = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    if (!userDeleted) {
      return NextResponse.json(
        { message: messages.error.userNotFound },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { userDeleted: userDeleted, message: messages.sucess.userDeleted },
      { status: 202 }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: messages.error.userNotFound },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: messages.error.default },
        { status: 500 }
      );
    }
  }
}

export async function PUT(request: Request, { params: { id } }: Params) {
  try {
    const { username, email, password, role, image } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const userUpdated = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        username,
        email,
        password: hashedPassword,
        role,
        image,
      },
    });

    return NextResponse.json(
      { userUpdated: userUpdated, message: messages.sucess.userUpdated },
      { status: 202 }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: messages.error.userNotFound },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { message: messages.error.default },
        { status: 500 }
      );
    }
  }
}
