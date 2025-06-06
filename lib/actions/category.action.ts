"use server";

import { connectToDatabase } from "@/lib/mongodb";
import Category from "@/database/category.model";
import { Types } from "mongoose";
import { uploadImageBuffer } from "./cloudinary.action";
export async function getCategoryById(id: string, userId: string) {
  await connectToDatabase();

  if (!Types.ObjectId.isValid(id)) {
    throw new Error("ID không hợp lệ.");
  }

  const category = await Category.findOne({ _id: id, userId });

  if (!category) {
    throw new Error("Không tìm thấy danh mục.");
  }

  return {
    _id: category._id.toString(),
    name: category.name,
    type: category.type,
    color: category.color,
    icon: category.icon,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
}

export async function getAllCategories(skip = 0, limit = 10, userId: string) {
  await connectToDatabase();
  const categories = await Category.find({ userId:userId })
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createCategory(_prevState: any, formData: FormData) {
  await connectToDatabase();

  try {
    const userId = formData.get("userId")?.toString();
    const name = formData.get("name")?.toString();
    const type = formData.get("type")?.toString() as "income" | "expense";
    const iconFile = formData.get("icon") as File;
    const color = formData.get("color")?.toString();

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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newCategory = await Category.create({
      userId: new Types.ObjectId(userId),
      name,
      type,
      icon: iconUrl,
      color,
      createdAt: new Date(),
    });

    return { success: true, redirect: "/finance/category" };
  } catch (error) {
    console.error("Create Category Error:", error);
    return { success: false, message: "Lỗi máy chủ khi tạo danh mục." };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateCategory(_prevState: any, formData: FormData) {
  await connectToDatabase();

  try {
    const _id = formData.get("_id")?.toString();
    const name = formData.get("name")?.toString();
    const type = formData.get("type")?.toString() as "income" | "expense";
    const icon = formData.get("icon")?.toString();
    const color = formData.get("color")?.toString();

    if (!_id) return { success: false, message: "Thiếu ID danh mục." };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    return { success: true, redirect:"/finance/category" };
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
  
    const normalizeString = (str: string) => 
      str.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    
    const allCategories = await Category.find({ userId });
    
    const normalizedQuery = normalizeString(q);
    const filteredCategories = allCategories.filter(category => 
      normalizeString(category.name).includes(normalizedQuery)
    );

    return filteredCategories.map(category => category.toObject());
}