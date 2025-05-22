// app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { hashPassword } from "@/lib/hash";
import User from "@/database/user.model";

interface RegisterBody {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phoneNumber, password }: RegisterBody =
      await req.json();
    await connectToDatabase();

    const existing = await User.findOne({
      $or: [{ email }, { phoneNumber: email }]
    });
    if (existing) {
      return NextResponse.json(
        { error: "Email or Phone number đã tồn tại" },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);
    await User.create({ name, email, phoneNumber, passwordHash });

    return NextResponse.json({ message: "Đăng ký thành công" });
  } catch (err) {
    return NextResponse.json({ error: "Lỗi server " + err }, { status: 500 });
  }
}
