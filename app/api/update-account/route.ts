import { NextResponse } from "next/server";
import { auth } from "@/auth";
import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: Request) {
  const session = await auth();
  const { email, phoneNumber } = await req.json();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();

  const user = await User.findById(session.user.id);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  let updated = false;

  if (email && email !== user.email) {
    user.email = email;
    updated = true;
  }

  if (phoneNumber && phoneNumber !== user.phoneNumber) {
    user.phoneNumber = phoneNumber;
    updated = true;
  }

  if (updated) {
    await user.save();
    return NextResponse.json({ message: "Account info updated successfully" });
  } else {
    return NextResponse.json({ message: "No changes made" });
  }
}
