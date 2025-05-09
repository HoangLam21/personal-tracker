"use server";

import { connectToDatabase } from "@/lib/mongodb";
import Transaction from "@/database/transaction.model";
import { Types } from "mongoose";
import { redirect } from "next/navigation";

// Lấy giao dịch theo ID
export async function getTransactionById(id: string, userId: string) {
  await connectToDatabase();

  if (!Types.ObjectId.isValid(id)) throw new Error("ID không hợp lệ.");

  const transaction = await Transaction.findOne({ _id: id, userId }).populate(
    "categoryId"
  );

  if (!transaction) throw new Error("Không tìm thấy giao dịch.");

  const category = transaction.categoryId as any;

  return {
    _id: transaction._id.toString(),
    userId: transaction.userId.toString(),
    category: {
      _id: category?._id?.toString() || "",
      name: category?.name || "",
      color: category?.color || "",
      icon: category?.icon || "",
    },
    amount: transaction.amount,
    note: transaction.note,
    date: transaction.date,
    type: transaction.type,
    createdAt: transaction.createdAt,
    updatedAt: transaction.updatedAt,
  };
}

// Lấy tất cả giao dịch

export async function getAllTransactions(skip = 0, limit = 10, userId: string) {
  await connectToDatabase();

  const transactions = await Transaction.find({ userId })
    .sort({ createdAt: -1 })
    .skip(Number(skip))
    .limit(Number(limit))
    .populate("categoryId");

  return transactions.map((t) => {
    const category = t.categoryId as any; // do populate trả về object

    return {
      _id: t._id.toString(),
      userId: t.userId.toString(),
      amount: t.amount,
      note: t.note,
      date: t.date,
      type: t.type,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
      category: {
        _id: category?._id?.toString() || "",
        name: category?.name || "",
        icon: category?.icon || "",
        color: category?.color || "",
      },
    };
  });
}

// Tạo giao dịch mới
export async function createTransaction(_prevState: any, formData: FormData) {
  await connectToDatabase();

  try {
    const userId = formData.get("userId")?.toString();
    const categoryId = formData.get("categoryId")?.toString();
    const amount = parseFloat(formData.get("amount")?.toString() || "0");
    const note = formData.get("note")?.toString();
    const date = new Date(formData.get("date")?.toString() || new Date());
    const type = formData.get("type")?.toString() as "income" | "expense";

    if (!userId || !categoryId || !type || isNaN(amount)) {
      return { success: false, message: "Thiếu thông tin bắt buộc." };
    }

    const transaction = await Transaction.create({
      userId: new Types.ObjectId(userId),
      categoryId: new Types.ObjectId(categoryId),
      amount,
      note,
      date,
      type,
      createdAt: new Date(),
    });

    return { success: true, redirect: "/finance" };
  } catch (error) {
    console.error("Create Transaction Error:", error);
    return { success: false, message: "Lỗi máy chủ khi tạo giao dịch." };
  }
}

// Cập nhật giao dịch
export async function updateTransaction(_prevState: any, formData: FormData) {
  await connectToDatabase();

  try {
    const _id = formData.get("_id")?.toString();
    const categoryId = formData.get("categoryId")?.toString();
    const amount = parseFloat(formData.get("amount")?.toString() || "0");
    const note = formData.get("note")?.toString();
    const date = new Date(formData.get("date")?.toString() || new Date());
    const type = formData.get("type")?.toString() as "income" | "expense";

    if (!_id || isNaN(amount))
      return { success: false, message: "Dữ liệu không hợp lệ." };

    const updated = await Transaction.findByIdAndUpdate(
      _id,
      {
        ...(categoryId && { categoryId }),
        ...(note && { note }),
        ...(type && { type }),
        amount,
        date,
        updatedAt: new Date(),
      },
      { new: true }
    );

    return { success: true, redirect:"/finance" };
  } catch (error) {
    console.error("Update Transaction Error:", error);
    return { success: false, message: "Lỗi cập nhật giao dịch." };
  }
}

// Xoá giao dịch
export async function deleteTransaction(id: string) {
  await connectToDatabase();

  if (!id) throw new Error("Thiếu ID giao dịch.");

  return await Transaction.findByIdAndDelete(id);
}

// Tìm kiếm theo ghi chú
export async function searchTransactionByNote(q: string, userId: string) {
  await connectToDatabase();

  const normalizeString = (str: string) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const allTransactions = await Transaction.find({ userId }).populate(
    "categoryId"
  );

  const normalizedQuery = normalizeString(q);
  const filtered = allTransactions.filter((t) =>
    normalizeString(t.note || "").includes(normalizedQuery)
  );

  return filtered.map((t) => {
    const category = t.categoryId as any;
    return {
      _id: t._id.toString(),
      type: t.type,
      amount: t.amount,
      note: t.note,
      date: t.date,
      category: {
        _id: category?._id?.toString() || "",
        name: category?.name || "",
        color: category?.color || "",
        icon: category?.icon || "",
      },
    };
  });
}
