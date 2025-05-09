"use client";

import { useActionState, useEffect } from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input/Input";
import { Button } from "@/components/ui/button/Button";
import { Selection } from "@/components/ui/selection/Selection";
import { createCategory } from "@/lib/actions/category.action";
import { ImageInput } from "../ui/input/ImageInput";
import { useRouter } from "next/navigation";

const initialState = { success: false, message: "" };

const typeOptions = [
  { label: "Thu nhập", value: "income" },
  { label: "Chi tiêu", value: "expense" },
];

export default function CreateCategoryForm({ userId }: { userId: string }) {
  const [type, setType] = useState("income");
  const [formState, formAction] = useActionState(createCategory, initialState);
  const router = useRouter();
  useEffect(() => {
    if (formState.success) {
      router.push(formState.redirect);
    }
  }, [formState]);
  return (
    <form
      action={formAction}
      className="w-full h-full space-y-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-md"
    >
      <h2 className="text-xl font-semibold text-gray-800">Tạo danh mục mới</h2>
      <input type="hidden" name="userId" value={userId} />

      {/* Tên danh mục */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Tên danh mục
        </label>
        <Input name="name" placeholder="Ví dụ: Lương, Mua sắm..." required />
      </div>

      {/* Loại danh mục */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Loại</label>
        <Selection
          options={typeOptions}
          value={type}
          onChange={(val) => setType(val)}
        />
        <input type="hidden" name="type" value={type} />
      </div>

      {/* Màu sắc */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Màu sắc</label>
        <div className="flex items-center gap-4">
          <input
            name="color"
            type="color"
            defaultValue="#ff9900"
            className="h-10 w-10 rounded-md border border-gray-300 shadow-sm cursor-pointer"
          />
          <span className="text-sm text-gray-600">Chọn màu biểu tượng</span>
        </div>
      </div>

      {/* Icon */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Biểu tượng (icon)</label>
        <ImageInput name="icon" type="file" accept="image/*"/>
      </div>

      {/* Thông báo lỗi */}
      {formState.message && (
        <p className="text-sm text-red-500">{formState.message}</p>
      )}

      <Button type="submit">Tạo danh mục</Button>
    </form>
  );
}
