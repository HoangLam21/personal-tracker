import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Convert file to buffer (stream)
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload to Cloudinary
  const uploadResult = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "avatars" }, (err, result) => {
        if (err || !result) return reject(err);
        resolve(result);
      })
      .end(buffer);
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return NextResponse.json({ url: (uploadResult as any).secure_url });
}
