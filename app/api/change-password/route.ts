import { NextResponse } from "next/server";
import { auth } from "@/auth";
import User from "@/database/user.model";
import { comparePassword, hashPassword } from "@/lib/hash";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: Request) {
  const session = await auth();
  const { currentPassword, newPassword } = await req.json();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();

  const user = await User.findById(session.user.id);
  if (!user || !user.passwordHash) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const isMatch = await comparePassword(currentPassword, user.passwordHash);
  if (!isMatch) {
    return NextResponse.json(
      { error: "Current password is incorrect" },
      { status: 400 }
    );
  }

  user.passwordHash = await hashPassword(newPassword);
  await user.save();

  return NextResponse.json({ message: "Password updated successfully" });
}
