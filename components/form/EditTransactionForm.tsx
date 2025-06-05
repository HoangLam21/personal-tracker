"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { Input } from "@/components/ui/input/Input";
import { Button } from "@/components/ui/button/Button";
import { Selection } from "@/components/ui/selection/Selection";
import {
  getTransactionById,
  updateTransaction,
} from "@/lib/actions/transaction.action";
import { getAllCategories } from "@/lib/actions/category.action";
import { useRouter } from "next/navigation";

const typeOptions = [
  { label: "Thu nhập", value: "income" },
  { label: "Chi tiêu", value: "expense" },
];

const initialState = { success: false, message: "" };

export default function EditTransactionForm({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) {
  const [transaction, setTransaction] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formState, formAction] = useActionState(
    updateTransaction,
    initialState
  );
  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getTransactionById(id, userId);
        const cats = await getAllCategories(0, 100, userId); // lấy tối đa 100 danh mục
        setTransaction(data);
        setCategories(cats);
      } catch (err) {
        console.error("Lỗi lấy giao dịch:", err);
      }
    };
    fetch();
  }, [id, userId]);

  useEffect(() => {
    if (formState.success) {
      router.push(formState.redirect!);
    }
  });

  if (!transaction) {
    return <p className="text-gray-500 text-sm">Đang tải dữ liệu...</p>;
  }

  return (
    <form
      action={formAction}
      className="w-full h-full space-y-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-md"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        Chỉnh sửa giao dịch
      </h2>
      <input type="hidden" name="_id" value={transaction._id} />
      <input type="hidden" name="userId" value={userId} />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Danh mục</label>
        <select
          name="categoryId"
          defaultValue={transaction.category._id}
          required
          className="border border-gray-300 rounded-md p-2"
        >
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Số tiền</label>
        <Input
          type="number"
          name="amount"
          step="0.01"
          required
          defaultValue={transaction.amount}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Ghi chú</label>
        <Input name="note" defaultValue={transaction.note || ""} />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Ngày</label>
        <Input
          name="date"
          type="date"
          required
          defaultValue={new Date(transaction.date).toISOString().slice(0, 10)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Loại giao dịch
        </label>
        <Selection
          options={typeOptions}
          value={transaction.type}
          onChange={() => {}}
          disabled
        />
        <input type="hidden" name="type" value={transaction.type} />
      </div>

      {formState.message && (
        <p className="text-sm text-red-500">{formState.message}</p>
      )}

      <Button type="submit">Cập nhật giao dịch</Button>
    </form>
  );
}
