"use server"
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input/Input";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import CategoryTableClient from "@/components/table/CategoryTableClient";

export default async function CategoryPage() {
    const session = await auth();
    const userId = session?.user?.id;
  if (!userId) {
    return <p className="p-4 text-red-500">Bạn cần đăng nhập để xem danh mục.</p>;
  }


  return (
    <main className="m-4 flex-1 flex flex-col gap-2 border border-gray-200 p-4 rounded-2xl">
      <Header title="Your categories" description="Danh mục thu/chi của bạn" />
      <CategoryTableClient userId={userId}/>
    </main>
  );
}
