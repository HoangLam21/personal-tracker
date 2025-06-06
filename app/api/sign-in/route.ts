import { signInAction } from "@/lib/actions/auth.action";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const {email, password} = await req.json();
    const result  = await signInAction(email, password);
    return NextResponse.json(result);
}
