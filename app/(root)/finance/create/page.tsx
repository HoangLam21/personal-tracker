"use server";

import { auth } from "@/auth";
import CreateTransactionForm from "@/components/form/CreateTransactionForm";

export default async function CreateTransactionPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return <p className="text-red-500 p-4">Bạn cần đăng nhập để tạo danh mục.</p>;
  }

  return (
    <main className="flex-1 w-full h-full flex items-center justify-center">
      <CreateTransactionForm userId={userId} />
    </main>
  );
}
