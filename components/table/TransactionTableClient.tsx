"use client";

import { Table } from "@/components/ui/table/Table";
import {
    deleteTransaction,
  getAllTransactions,
  searchTransactionByNote,
} from "@/lib/actions/transaction.action";
import { Search, Plus, ArrowRight } from "lucide-react";
import { Input } from "../ui/input/Input";
import { Button } from "../ui/button/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

interface Props {
  userId: string;
}

export default function TransactionTableClient({ userId }: Props) {
  const router = useRouter();
  const headers = ["Category", "Amount", "Note", "Date", "Type"];

  const [searchTerm, setSearchTerm] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);

  const formatCategory = (category: any) => {
    if (!category) return "N/A";
    return (
      <span className="inline-flex items-center gap-2">
        {/* Màu danh mục */}
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: category.color || "#ccc" }}
        ></span>

        {/* Icon nếu có */}
        {category.icon && (
          <img
            src={category.icon}
            alt="icon"
            className="w-5 h-5 object-contain"
          />
        )}

        {/* Tên danh mục */}
        <span>{category.name}</span>
      </span>
    );
  };

  const fetchData = async (page: number, limit: number) => {
    const skip = (page - 1) * limit;

    const results =
      searchTerm.trim() !== ""
        ? await searchTransactionByNote(searchTerm.trim(), userId)
        : await getAllTransactions(skip, limit, userId);

    return results.map((t: any) => ({
      id: t._id,
      rowType: t.type, // 👈 dùng để xác định thu nhập / chi tiêu trong bảng
      cells: [
        formatCategory(t.category),
        t.amount.toLocaleString("vi-VN"), // Hiển thị có dấu chấm phân cách
        t.note || "Không có ghi chú",
        new Date(t.date).toLocaleDateString("vi-VN"),
        t.type === "income" ? "Thu nhập" : "Chi tiêu",
      ],
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between gap-8">
        <div className="flex flex-row items-center justify-center gap-2 w-full">
          <Input
            variant="default"
            placeholder="Tìm ghi chú giao dịch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={() => setTriggerSearch(!triggerSearch)}>
            <Search />
          </Button>
        </div>
        <div className="flex flex-row w-full items-center justify-end gap-8">
          <Link href="/finance/create">
            <Button variant="default">
              <Plus className="mr-1 h-4 w-4" />
              Tạo giao dịch mới
            </Button>
          </Link>
          <Link href="/finance/category">
            <Button variant="outline">
              <ArrowRight className="mr-1 h-4 w-4" />
              All categories
            </Button>
          </Link>
        </div>
      </div>

      <div key={triggerSearch}>
        <Table
          headers={headers}
          fetchData={fetchData}
          onEdit={(id) => router.push(`/finance/edit/${id}`)}
          onDelete={async (id)=> await deleteTransaction(id)}
        />
      </div>
    </div>
  );
}
