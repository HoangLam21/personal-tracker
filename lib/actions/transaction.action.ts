"use server";

import { connectToDatabase } from "@/lib/mongodb";
import "@/database/category.model";
import Transaction from "@/database/transaction.model";
import mongoose, { Types } from "mongoose";
import {
  CategoryChartData,
  ChartDataItem,
  getCategoryIcon,
  TransactionSummary,
  TrendResult
} from "@/constant";
import { ChartType, TimeRange } from "@/components/shared/StatisticHeader";
import dayjs from "dayjs";
import { mapHexToTailwind500 } from "../utils";

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
      icon: category?.icon || ""
    },
    amount: transaction.amount,
    note: transaction.note,
    date: transaction.date,
    type: transaction.type,
    createdAt: transaction.createdAt,
    updatedAt: transaction.updatedAt
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
        color: category?.color || ""
      }
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
      createdAt: new Date()
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
        updatedAt: new Date()
      },
      { new: true }
    );

    return { success: true, redirect: "/finance" };
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
        icon: category?.icon || ""
      }
    };
  });
}

// Lấy dữ liệu cho chart
export async function getTransactionSummary(
  userId: string
): Promise<TransactionSummary> {
  await connectToDatabase();

  const result = await Transaction.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId)
      }
    },
    {
      $group: {
        _id: "$type",
        totalAmount: { $sum: "$amount" }
      }
    }
  ]);

  let income = 0;
  let expense = 0;

  result.forEach((item) => {
    if (item._id === "income") {
      income = item.totalAmount;
    } else if (item._id === "expense") {
      expense = item.totalAmount;
    }
  });

  const profit = income - expense;

  return {
    income,
    expense,
    profit
  };
}

export async function getChartData(
  userId: string,
  range: TimeRange,
  chartType: ChartType = "general"
): Promise<ChartDataItem[]> {
  await connectToDatabase();

  const now = new Date();
  let startDate: Date;

  switch (range) {
    case "year":
      startDate = new Date(now.getFullYear(), 0, 1);
      break;
    case "month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "last7days":
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      break;
    default:
      startDate = new Date(now.getFullYear(), 0, 1);
  }

  const matchCondition: any = {
    userId: new mongoose.Types.ObjectId(userId),
    date: { $gte: startDate, $lte: now }
  };

  // Nếu không phải general, filter theo type luôn
  if (chartType !== "general") {
    matchCondition.type = chartType === "income" ? "income" : "expense";
  }

  const transactions = await Transaction.aggregate([
    {
      $match: matchCondition
    },
    {
      $project: {
        amount: 1,
        type: 1,
        date: 1,
        label: range === "year" ? { $month: "$date" } : { $dayOfMonth: "$date" }
      }
    },
    {
      $group: {
        _id: { label: "$label", type: "$type" },
        total: { $sum: "$amount" }
      }
    }
  ]);

  const chartMap: Record<string, ChartDataItem> = {};

  if (range === "year") {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    months.forEach((month, i) => {
      chartMap[(i + 1).toString()] = { month, income: 0, expense: 0 };
    });
  } else {
    for (let d = 1; d <= 31; d++) {
      const label = d.toString();
      chartMap[label] = {
        month: label.padStart(2, "0"),
        income: 0,
        expense: 0
      };
    }
  }

  transactions.forEach((item) => {
    const label = item._id.label.toString();
    const type = item._id.type;
    const total = item.total;

    if (chartMap[label]) {
      if (type === "income") chartMap[label].income = total;
      else chartMap[label].expense = total;
    }
  });

  return Object.values(chartMap).filter((d) => d.income > 0 || d.expense > 0);
}

export async function getTopExpenseCategoriesForPieChart(
  userId: string
): Promise<CategoryChartData[]> {
  await connectToDatabase();

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const result = await Transaction.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        type: "expense",
        date: { $gte: sixMonthsAgo }
      }
    },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category"
      }
    },
    { $unwind: "$category" },
    {
      $group: {
        _id: "$category._id",
        name: { $first: "$category.name" },
        color: { $first: "$category.color" },
        total: { $sum: "$amount" }
      }
    },
    {
      $sort: { total: -1 }
    }
  ]);

  const top3 = result.slice(0, 3);
  const others = result.slice(3);

  const top3Data: CategoryChartData[] = top3.map((item) => ({
    category: item.name || "Unknown",
    value: item.total,
    fill: item.fill || "#6B7280" // fallback nếu thiếu màu
  }));

  const othersTotal = others.reduce((sum, item) => sum + item.total, 0);

  if (othersTotal > 0) {
    top3Data.push({
      category: "Others",
      value: othersTotal,
      fill: "#6B7280" // hoặc #4B5563
    });
  }

  return top3Data;
}

export async function getTopIncomeCategoriesForBarChart(
  userId: string
): Promise<CategoryChartData[]> {
  await connectToDatabase();

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const result = await Transaction.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        type: "income",
        date: { $gte: sixMonthsAgo }
      }
    },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category"
      }
    },
    { $unwind: "$category" },
    {
      $group: {
        _id: "$category._id",
        name: { $first: "$category.name" },
        color: { $first: "$category.color" },
        total: { $sum: "$amount" }
      }
    },
    { $sort: { total: -1 } }
  ]);

  const top4 = result.slice(0, 4);
  const others = result.slice(4);

  const chartData: CategoryChartData[] = top4.map((item) => ({
    category: item.name || "Unknown",
    value: item.total,
    fill: item.color || "#6B7280"
  }));

  const othersTotal = others.reduce((sum, item) => sum + item.total, 0);

  if (othersTotal > 0) {
    chartData.push({
      category: "Others",
      value: othersTotal,
      fill: "#6B7280"
    });
  }

  return chartData;
}

export async function getIncomeExpenseComparison(userId: string): Promise<{
  income: TrendResult;
  expense: TrendResult;
}> {
  await connectToDatabase();

  const now = new Date();
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const twelveMonthsAgo = new Date(now);
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  const [currentIncome, previousIncome, currentExpense, previousExpense] =
    await Promise.all([
      Transaction.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            type: "income",
            date: { $gte: sixMonthsAgo, $lte: now }
          }
        },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),
      Transaction.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            type: "income",
            date: { $gte: twelveMonthsAgo, $lt: sixMonthsAgo }
          }
        },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),
      Transaction.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            type: "expense",
            date: { $gte: sixMonthsAgo, $lte: now }
          }
        },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),
      Transaction.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            type: "expense",
            date: { $gte: twelveMonthsAgo, $lt: sixMonthsAgo }
          }
        },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ])
    ]);

  function calculateTrend(current: number, previous: number): TrendResult {
    if (previous === 0 && current > 0) {
      return { direction: "up", percentage: 100, current, previous };
    }

    if (previous === 0 && current === 0) {
      return { direction: "same", percentage: 0, current, previous };
    }

    const change = ((current - previous) / previous) * 100;
    const percentage = Math.abs(Number(change.toFixed(1)));
    const direction = change > 0 ? "up" : change < 0 ? "down" : "same";

    return { direction, percentage, current, previous };
  }

  const income = calculateTrend(
    currentIncome[0]?.total || 0,
    previousIncome[0]?.total || 0
  );
  const expense = calculateTrend(
    currentExpense[0]?.total || 0,
    previousExpense[0]?.total || 0
  );

  return { income, expense };
}

//StatCard at Dashboard
export async function calculateMonthlyStats(userId: string) {
  const start = dayjs().startOf("month").toDate();
  const end = dayjs().endOf("day").toDate();

  const [incomeResult, expenseResult] = await Promise.all([
    Transaction.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
          type: "income",
          date: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]),
    Transaction.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
          type: "expense",
          date: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ])
  ]);

  const totalIncome = incomeResult[0]?.total || 0;
  const totalExpense = expenseResult[0]?.total || 0;
  const balance = totalIncome - totalExpense;

  return { totalIncome, totalExpense, balance };
}

export async function getTopCategoriesByType(
  userId: string,
  type: "income" | "expense"
) {
  const start = dayjs().startOf("month").toDate();
  const end = dayjs().endOf("day").toDate();

  const result = await Transaction.aggregate([
    {
      $match: {
        userId: new Types.ObjectId(userId),
        type,
        date: { $gte: start, $lte: end }
      }
    },
    {
      $group: {
        _id: "$categoryId",
        total: { $sum: "$amount" }
      }
    },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "_id",
        as: "category"
      }
    },
    { $unwind: "$category" },
    {
      $project: {
        _id: 0,
        name: "$category.name",
        value: "$total",
        color: "$category.color"
      }
    },
    { $sort: { value: -1 } }
  ]);

  const top10 = result.slice(0, 10);
  const rest = result.slice(10);

  const otherTotal = rest.reduce((sum, item) => sum + item.value, 0);

  if (otherTotal > 0) {
    top10.push({
      name: "Other",
      value: otherTotal,
      color: "#D1D5DB" // gray
    });
  }

  return top10;
}

export async function getAllUserSpendingGroupedByDate(userId: string) {
  const raw = await Transaction.aggregate([
    {
      $match: {
        userId: new Types.ObjectId(userId),
        type: "expense"
      }
    },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category"
      }
    },
    { $unwind: "$category" },
    {
      $project: {
        date: {
          $dateToString: { format: "%Y-%m-%d", date: "$date" }
        },
        category: "$category.name",
        color: "$category.color",
        amount: 1,
        method: 1,
        _id: 0
      }
    },
    { $sort: { date: -1 } }
  ]);

  // Group by date
  const grouped: Record<string, any[]> = {};

  for (const tx of raw) {
    const date = tx.date;
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push({
      category: tx.category,
      amount: tx.amount,
      method: tx.method,
      color: mapHexToTailwind500(tx.color),
      icon: getCategoryIcon(tx.category)
    });
  }

  return Object.entries(grouped).map(([date, items]) => ({
    date,
    items
  }));
}
