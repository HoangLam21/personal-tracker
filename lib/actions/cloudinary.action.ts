'use server';

import cloudinary from "@/lib/cloudinary";
import { v4 as uuidv4 } from "uuid";

export async function uploadImageBuffer(file: File): Promise<string | null> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "uploads",
          public_id: uuidv4(),
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return result.secure_url;
  } catch (error) {
    console.error("Upload failed:", error);
    return null;
  }
}
