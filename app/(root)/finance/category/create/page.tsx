"use server";

import { auth } from "@/auth";
import CreateCategoryForm from "@/components/form/CreateCategoryForm";

export default async function CreateCategoryPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return <p className="text-red-500 p-4">Bạn cần đăng nhập để tạo danh mục.</p>;
  }

  return (
    <main className="flex-1 w-full h-full flex items-center justify-center">
      <CreateCategoryForm userId={userId} />
    </main>
  );
}
