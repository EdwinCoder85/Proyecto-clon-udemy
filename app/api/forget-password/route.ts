import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import jwt from "jsonwebtoken";
import { messages } from "@/utils/messages";
import Email from '@/emails';
import { render } from '@react-email/components';
import { ForgotPassword } from '@/interfaces';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body: ForgotPassword = await request.json();

    const { email } = body;

    const userFind = await prisma.user.findUnique({
      where: { email: email },
    });

    // validar que exista el usuario
    if (!userFind) {
      return NextResponse.json(
        { user: null, message: messages.error.userNotFound},
        { status: 409 }
      );
    }

    const tokenData = {
      email: userFind.email,
      userId: userFind.id,
      userName: userFind.username
    };

    const token = jwt.sign({ data: tokenData }, "secreto", {
      expiresIn: "86400",
    });

    const resetPasswordLink = `http://localhost:3000/auth/change-password?token=${token}`;
    const userFirstname = tokenData.userName

    await resend.emails.send({
      from: "Course Programming<onboarding@resend.dev>",
      // from: "Course Programming<noreply@coursesprogramming.com>",
      to: email,
      subject: "Cambio de contraseña",
      html: render(Email({userFirstname, resetPasswordLink})),
      // html: `<a href=${forgetUrl}>Cambiar contraseña</a>`,
    });

    return NextResponse.json(
      { message: messages.sucess.emailSent },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default, error },
      { status: 500 }
    );
  }
}
