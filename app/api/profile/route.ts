import { auth } from "@/auth";
import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const user = await User.findById(session.user.id).select(
    "name avatar email phoneNumber"
  );

  return NextResponse.json({
    name: user.name,
    avatar: user.avatar || "/avatar.png",
    email: user.email,
    phoneNumber: user.phoneNumber
  });
}
