import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  return <div className="text-black">Dashboard content, hello user {session?.user.id}</div>;
}