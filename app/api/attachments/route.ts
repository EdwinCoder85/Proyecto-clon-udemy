import { Attachement } from '@/interfaces';
import prisma from "@/libs/prisma";
import { messages } from "@/utils/messages";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: Attachement = await req.json();
    const { name, url, courseId, duration } = body;

    // check if attachment already exists
    const existingAttachment = await prisma.attachment.findFirst({
      where: { name: name },
    });

    if (existingAttachment) {
      return NextResponse.json(
        {
          attachment: null,
          message: messages.error.attachmentNotFound,
        },
        { status: 409 }
      );
    }

    const newAttachment = await prisma.attachment.create({
      data: {
        name,
        url,
        courseId,
        duration
      },
    });

    return NextResponse.json(
      { attachment: newAttachment, message: messages.sucess.attachmentCreated },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default },
      { status: 500 }
    );
  }
}
