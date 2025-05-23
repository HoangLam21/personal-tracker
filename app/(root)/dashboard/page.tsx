import { auth } from "@/auth";
import DashboardForm from "@/components/form/DashboardForm";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");
  const userId = session?.user?.id;

  if (!userId) {
    return (
      <p className="text-red-500 p-4">Bạn cần đăng nhập để tạo danh mục.</p>
    );
  }
  return <DashboardForm userId={userId} />;
}
