import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { messages } from "@/utils/messages";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get("file") as File;

  if (!file) {
    return NextResponse.json(
      { message: messages.error.fileNotFound },
      { status: 400 }
    );
  }

  // guardar el archivo en memoria del servidor
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          format: "png",
        },
        function (error, result) {
          if (error) {
            reject(error);
          }

          resolve(result);
        }
      )
      .end(buffer);
  });

  // return NextResponse.json(
  //   { result: result, message: messages.sucess.uploadedFile },
  //   { status: 201 }
  // );
  return NextResponse.json(result);
  
}
