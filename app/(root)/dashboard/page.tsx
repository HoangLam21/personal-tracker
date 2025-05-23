import { auth } from "@/auth";
import DashboardForm from "@/components/form/DashboardForm";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  return <DashboardForm />;
}
