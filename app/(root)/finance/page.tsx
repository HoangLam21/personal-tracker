import Header from "@/components/shared/Header";
import { auth } from "@/auth";
import TransactionTableClient from "@/components/table/TransactionTableClient";

export default async function CategoryPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return (
      <p className="p-4 text-red-500">Bạn cần đăng nhập để xem danh mục.</p>
    );
  }

  return (
    <main className="m-4 flex-1 flex flex-col gap-2 border border-gray-200 p-4 rounded-2xl">
      <Header title="Your categories" description="Danh mục thu/chi của bạn" />
      <TransactionTableClient userId={userId} />
    </main>
  );
}
