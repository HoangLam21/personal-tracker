"use client";

import { useActionState } from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input/Input";
import { Button } from "@/components/ui/button/Button";
import { Selection } from "@/components/ui/selection/Selection";
import { createCategory } from "@/lib/actions/category.action";

const initialState = { success: false, message: "" };

const typeOptions = [
  { label: "Thu nhập", value: "income" },
  { label: "Chi tiêu", value: "expense" },
];

export default function CreateCategoryForm({ userId }: { userId: string }) {
  const [type, setType] = useState("income");
  const [formState, formAction] = useActionState(createCategory, initialState);

  return (
    <form action={formAction} className="space-y-4 p-4">
      <input type="hidden" name="userId" value={userId} />

      <div>
        <label className="text-sm font-medium text-gray-700">Tên danh mục</label>
        <Input name="name" placeholder="Ví dụ: Lương, Mua sắm..." required />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Loại</label>
        <Selection
          options={typeOptions}
          value={type}
          onChange={(val) => setType(val)}
        />
        <input type="hidden" name="type" value={type} />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Màu sắc</label>
        <div className="flex items-center gap-3">
          <input
            name="color"
            type="color"
            defaultValue="#ff9900"
            className="h-10 w-10 rounded-md border border-gray-300 shadow-sm cursor-pointer"
          />
          <span className="text-sm text-gray-600">Chọn màu biểu tượng</span>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Biểu tượng (icon)</label>
        <Input name="icon" type="file" accept="image/*" />
      </div>

      {formState.message && (
        <p className="text-sm text-red-500">{formState.message}</p>
      )}

      <Button type="submit">Tạo danh mục</Button>
    </form>
  );
}
