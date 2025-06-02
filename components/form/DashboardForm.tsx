"use client";

import React, { useEffect, useState } from "react";
import Header from "../shared/Header";
import { useUserContext } from "@/context/UserContext";
import { formatCurrency } from "@/lib/utils";
import { Plus, PiggyBank, ArrowDownCircle } from "lucide-react";
import dayjs from "dayjs";
import DashboardLeftSection from "../section/DashboardLeftSection";
import DashboardRightSection from "../section/DashboardRightSection";
import DashboardHeaderActions from "../action/DashboardHeaderActions";
import {
  calculateMonthlyStats,
  getAllUserSpendingGroupedByDate,
  getTopCategoriesByType
} from "@/lib/actions/transaction.action";
type SpendingItem = {
  category: string;
  amount: number;
  method: string;
  icon: React.ReactNode;
  color: string;
};

type SpendingGroup = {
  date: string; // ví dụ: "May 24"
  items: SpendingItem[];
};

const DashboardForm = ({ userId }: { userId: string }) => {
  const { user } = useUserContext();
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format("YYYY-MM"));
  const [statItems, setStatItems] = useState<
    {
      icon: React.ReactNode;
      bgColor: string;
      label: string;
      value: string;
      isDashboard?: boolean;
    }[]
  >([
    {
      icon: <Plus className="w-6 h-6" />,
      bgColor: "bg-yellow-500",
      label: "Incomes",
      value: formatCurrency(0),
      isDashboard: true
    },
    {
      icon: <ArrowDownCircle className="w-6 h-6" />,
      bgColor: "bg-red-500",
      label: "Expenses",
      value: formatCurrency(0),
      isDashboard: true
    },
    {
      icon: <PiggyBank className="w-6 h-6" />,
      bgColor: "bg-green-500",
      label: "Savings/Debt",
      value: formatCurrency(0),
      isDashboard: true
    }
  ]);
  const [incomeCategories, setIncomeCategory] = useState<
    { name: string; value: number; color: string }[]
  >([{ name: "", value: 0, color: "" }]);
  const [expenseCategories, setExpenseCategory] = useState<
    { name: string; value: number; color: string }[]
  >([{ name: "", value: 0, color: "" }]);

  const [spendingData, setSpendingData] = useState<SpendingGroup[]>([]);

  useEffect(() => {
    async function fetchAllDashboardData() {
      try {
        const [stats, incomeCategories, expenseCategories, spending] =
          await Promise.all([
            calculateMonthlyStats(userId),
            getTopCategoriesByType(userId, "income"),
            getTopCategoriesByType(userId, "expense"),
            getAllUserSpendingGroupedByDate(userId)
          ]);

        // Tổng thu chi
        const statItems = [
          {
            icon: <Plus className="w-6 h-6" />,
            bgColor: "bg-yellow-500",
            label: "Incomes",
            value: formatCurrency(stats.totalIncome),
            isDashboard: true
          },
          {
            icon: <ArrowDownCircle className="w-6 h-6" />,
            bgColor: "bg-red-500",
            label: "Expenses",
            value: formatCurrency(stats.totalExpense),
            isDashboard: true
          },
          {
            icon: <PiggyBank className="w-6 h-6" />,
            bgColor: "bg-green-500",
            label: "Savings/Debt",
            value: formatCurrency(stats.balance),
            isDashboard: true
          }
        ];

        setStatItems(statItems);
        setIncomeCategory(incomeCategories);
        setExpenseCategory(expenseCategories);
        setSpendingData(spending);
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
      }
    }

    fetchAllDashboardData();
  }, [userId]);

  const isCurrentMonth = selectedMonth === dayjs().format("YYYY-MM");

  // Convert "February 28" -> "2023-02-28" để so sánh lọc tháng
  const normalizedSpending = spendingData.map((group) => {
    const parsedDate = dayjs(group.date);
    return {
      ...group,
      dateKey: parsedDate.format("YYYY-MM-DD"),
      dayTitle: parsedDate.format("MMMM D")
    };
  });
  // Lọc các spending trong tháng đang chọn (ví dụ "2023-02")
  const filteredSpending = normalizedSpending
    .filter((group) => group.dateKey.startsWith(selectedMonth))
    .sort((a, b) => (dayjs(b.dateKey).isAfter(dayjs(a.dateKey)) ? 1 : -1));

  return (
    <main className="m-4 flex-1 flex flex-col gap-6 border border-gray-200 p-6 rounded-2xl">
      <Header
        title={`Chào mừng bạn trở lại, ${user.name}`}
        description="Hãy cùng quản lý chi tiêu thông minh."
      />

      <DashboardHeaderActions />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side: charts and stats */}
        <DashboardLeftSection
          incomeCategories={incomeCategories}
          expenseCategories={expenseCategories}
          statItems={statItems}
        />

        {/* Right side: today's spending */}
        <DashboardRightSection
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          isCurrentMonth={isCurrentMonth}
          filteredSpending={filteredSpending}
        />
      </div>
    </main>
  );
};

export default DashboardForm;
