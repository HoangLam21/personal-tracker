"use client";

import { useActionState, useEffect, useState } from "react";
import { Input } from "@/components/ui/input/Input";
import { Button } from "@/components/ui/button/Button";
import { Selection } from "@/components/ui/selection/Selection";
import { createTransaction } from "@/lib/actions/transaction.action";
import { getAllCategories } from "@/lib/actions/category.action";
import { useRouter } from "next/navigation";

const initialState = { success: false, message: "" };

const typeOptions = [
  { label: "Thu nhập", value: "income" },
  { label: "Chi tiêu", value: "expense" },
];

interface Category {
  _id: string;
  name: string;
  type: "income" | "expense";
}

interface Props {
  userId: string;
}

export default function CreateTransactionForm({ userId }: Props) {
  const [type, setType] = useState<"income" | "expense">("income");
  const [formState, formAction] = useActionState(
    createTransaction,
    initialState
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;
  const router = useRouter();

  useEffect(() => {
    const loadInitial = async () => {
      const result = await getAllCategories(0, limit, userId);
      const filtered = result.filter((cat) => cat.type === type);
      setCategories(filtered);
      setPage(1);
      setHasMore(result.length === limit);
    };
    loadInitial();
  }, [type, userId]);

  useEffect(() => {
    if (formState.success) {
      router.push(formState.redirect);
    }
  }, [formState]);

  const loadMoreCategories = async () => {
    const result = await getAllCategories(page * limit, limit, userId);
    const filtered = result.filter((cat) => cat.type === type);
    setCategories((prev) => [...prev, ...filtered]);
    setPage((prev) => prev + 1);
    if (filtered.length < limit) setHasMore(false);
  };

  return (
    <form
      action={formAction}
      className="w-full h-full space-y-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-md"
    >
      <h2 className="text-xl font-semibold text-gray-800">Tạo giao dịch mới</h2>
      <input type="hidden" name="userId" value={userId} />

      {/* Số tiền */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Số tiền</label>
        <Input name="amount" type="number" step="0.01" required />
      </div>

      {/* Loại giao dịch */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Loại giao dịch</label>
        <Selection
          options={typeOptions}
          value={type}
          onChange={(val) => setType(val as "income" | "expense")}
        />
        <input type="hidden" name="type" value={type} />
      </div>

      {/* Danh mục */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Danh mục</label>
        <select
          name="categoryId"
          required
          className="h-10 rounded-md border border-gray-300 px-3 text-sm shadow-sm"
        >
          <option value="">-- Chọn danh mục --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {hasMore && (
          <button
            type="button"
            onClick={loadMoreCategories}
            className="text-sm text-blue-600 hover:underline self-start"
          >
            Tải thêm danh mục...
          </button>
        )}
      </div>

      {/* Ngày */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Ngày</label>
        <Input name="date" type="date" required />
      </div>

      {/* Ghi chú */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Ghi chú</label>
        <Input name="note" placeholder="Thêm ghi chú (nếu có)" />
      </div>

      {formState.message && (
        <p className="text-sm text-red-500">{formState.message}</p>
      )}

      <Button type="submit">Tạo giao dịch</Button>
    </form>
  );
}
