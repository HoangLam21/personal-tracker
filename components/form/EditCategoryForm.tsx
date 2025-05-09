"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { Input } from "@/components/ui/input/Input";
import { Button } from "@/components/ui/button/Button";
import { Selection } from "@/components/ui/selection/Selection";
import { ImageInput } from "@/components/ui/input/ImageInput";
import { getCategoryById, updateCategory } from "@/lib/actions/category.action";
import { useRouter } from "next/navigation";

const typeOptions = [
  { label: "Thu nhập", value: "income" },
  { label: "Chi tiêu", value: "expense" },
];

const initialState = { success: false, message: "" };

export default function EditCategoryForm({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) {
  const [category, setCategory] = useState(null);
  const [type, setType] = useState("income");
  const [formState, formAction] = useActionState(updateCategory, initialState);
  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getCategoryById(id, userId);
        setCategory(data);
        setType(data.type);
      } catch (err) {
        console.error("Lỗi lấy danh mục:", err);
      }
    };
    fetch();
  }, [id, userId]);

  useEffect(() => {
    if (formState.success) {
      router.push(formState.redirect);
    }
  }, [formState]);

  if (!category) {
    return <p className="text-gray-500 text-sm">Đang tải dữ liệu...</p>;
  }

  return (
    <form
      action={formAction}
      className="w-full h-full space-y-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-md"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        Chỉnh sửa danh mục
      </h2>
      <input type="hidden" name="_id" value={category._id} />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Tên danh mục
        </label>
        <Input name="name" defaultValue={category.name} required />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Loại</label>
        <Selection
          options={typeOptions}
          value={type}
          onChange={(val) => setType(val)}
        />
        <input type="hidden" name="type" value={type} />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Màu sắc</label>
        <div className="flex items-center gap-4">
          <input
            name="color"
            type="color"
            defaultValue={category.color || "#ff9900"}
            className="h-10 w-10 rounded-md border border-gray-300 shadow-sm cursor-pointer"
          />
          <span className="text-sm text-gray-600">Chọn màu biểu tượng</span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Biểu tượng (icon)
        </label>
        <ImageInput name="icon" accept="image/*" />
        {category.icon && (
          <p className="text-xs text-gray-500">
            Ảnh hiện tại đã có, nếu không chọn ảnh mới sẽ giữ nguyên.
          </p>
        )}
      </div>

      {formState.message && (
        <p className="text-sm text-red-500">{formState.message}</p>
      )}

      <Button type="submit">Cập nhật danh mục</Button>
    </form>
  );
}
