"use server";

import { connectToDatabase } from "@/lib/mongodb";
import Category from "@/database/category.model";
import { Types } from "mongoose";
import { uploadImageBuffer } from "./cloudinary.action";
import { redirect } from "next/navigation";

export async function getAllCategories(skip = 0, limit = 10, userId: string) {
    await connectToDatabase();
    const categories = await Category.find({ userId })
      .sort({ createdAt: -1 })
      .skip(Number(skip))
      .limit(Number(limit));
  
    // Chuyển Mongoose documents sang plain object
    return categories.map((cat) => ({
      _id: cat._id.toString(),
      name: cat.name,
      type: cat.type,
      color: cat.color,
      icon: cat.icon,
      createdAt: cat.createdAt,
      updatedAt: cat.updatedAt,
    }));
  }

export async function createCategory(_prevState: any, formData: FormData) {
    await connectToDatabase();
  
    try {
      const userId = formData.get('userId')?.toString();
      const name = formData.get('name')?.toString();
      const type = formData.get('type')?.toString() as 'income' | 'expense';
      const iconFile = formData.get('icon') as File;
      const color = formData.get('color')?.toString();
  
      if (!userId || !name || !type) {
        return { success: false, message: "Thiếu thông tin bắt buộc." };
      }
  
      let iconUrl = "";
  
      if (iconFile && iconFile.size > 0) {
        const uploadedUrl = await uploadImageBuffer(iconFile);
        if (!uploadedUrl) {
          return { success: false, message: "Tải ảnh lên thất bại." };
        }
        iconUrl = uploadedUrl;
      }
  
      const newCategory = await Category.create({
        userId: new Types.ObjectId(userId),
        name,
        type,
        icon: iconUrl,
        color,
        createdAt: new Date(),
      });
  
      return { success: true, redirectTo: "/finance/category" };
    } catch (error) {
      console.error("Create Category Error:", error);
      return { success: false, message: "Lỗi máy chủ khi tạo danh mục." };
    }
  }

export async function updateCategory(_prevState: any, formData: FormData) {
  await connectToDatabase();

  try {
    const _id = formData.get("_id")?.toString();
    const name = formData.get("name")?.toString();
    const type = formData.get("type")?.toString() as "income" | "expense";
    const icon = formData.get("icon")?.toString();
    const color = formData.get("color")?.toString();

    if (!_id) return { success: false, message: "Thiếu ID danh mục." };

    const updated = await Category.findByIdAndUpdate(
      _id,
      {
        ...(name && { name }),
        ...(type && { type }),
        ...(icon && { icon }),
        ...(color && { color }),
        updatedAt: new Date(),
      },
      { new: true }
    );

    return { success: true, data: updated };
  } catch (error) {
    console.error("Update Category Error:", error);
    return { success: false, message: "Lỗi cập nhật danh mục." };
  }
}

export async function deleteCategory(id: string) {
  await connectToDatabase();

  if (!id) throw new Error("Thiếu ID danh mục.");

  return await Category.findByIdAndDelete(id);
}

export async function searchCategoryByName(q: string, userId: string) {
  await connectToDatabase();

  return await Category.find({
    userId,
    name: { $regex: q, $options: "i" },
  });
}
