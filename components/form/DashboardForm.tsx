"use client";

import React, { useState } from "react";
import Header from "../shared/Header";
import { useUserContext } from "@/context/UserContext";
import { formatCurrency } from "@/lib/utils";
import {
  ShoppingCart,
  Plus,
  Gift,
  Bus,
  Coffee,
  Gamepad,
  Shirt,
  PiggyBank,
  Wallet,
  ArrowDownCircle
} from "lucide-react";
import dayjs from "dayjs";
import DashboardLeftSection from "../section/DashboardLeftSection";
import DashboardRightSection from "../section/DashboardRightSection";
import DashboardHeaderActions from "../action/DashboardHeaderActions";

const DashboardForm = () => {
  const { user } = useUserContext();
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format("YYYY-MM"));

  const totalIncome = 1210;
  const totalExpense = 581.5;
  const budget = 900;
  const balance = totalIncome - totalExpense;
  const statItems = [
    {
      icon: <Plus className="w-6 h-6" />,
      bgColor: "bg-yellow-500",
      label: "Incomes",
      value: formatCurrency(totalIncome),
      isDashboard: true
    },
    {
      icon: <ArrowDownCircle className="w-6 h-6" />,
      bgColor: "bg-red-500",
      label: "Expenses",
      value: formatCurrency(totalExpense),
      isDashboard: true
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      bgColor: "bg-indigo-500",
      label: "Budget",
      value: formatCurrency(budget),
      isDashboard: true
    },
    {
      icon: <PiggyBank className="w-6 h-6" />,
      bgColor: "bg-green-500",
      label: "Savings/Debt",
      value: formatCurrency(balance),
      isDashboard: true
    }
  ];

  const incomeCategories = [
    { name: "Salary", value: 1200, color: "#7C3AED" },
    { name: "Cashback", value: 10, color: "#22C55E" }
  ];

  const expenseCategories = [
    { name: "Groceries", value: 50, color: "#8B5CF6" },
    { name: "Health", value: 80, color: "#22C55E" },
    { name: "Restaurants", value: 230, color: "#6366F1" },
    { name: "Transport", value: 10, color: "#06B6D4" },
    { name: "Shopping", value: 120, color: "#F97316" },
    { name: "Entertainment", value: 20, color: "#EF4444" },
    { name: "Gifts", value: 70, color: "#3B82F6" },
    { name: "Commissions", value: 1.5, color: "#EAB308" }
  ];

  const spendingData = [
    {
      date: "2025-05-05",
      items: [
        {
          category: "Health",
          amount: 20,
          method: "Credit card №1",
          icon: <Plus className="w-4 h-4" />,
          color: "bg-green-500"
        },
        {
          category: "Groceries",
          amount: 35,
          method: "Credit card №1",
          icon: <ShoppingCart className="w-4 h-4" />,
          color: "bg-purple-500"
        },
        {
          category: "Gifts",
          amount: 58,
          method: "Credit card №2",
          icon: <Gift className="w-4 h-4" />,
          color: "bg-blue-500"
        },
        {
          category: "Transport",
          amount: 5,
          method: "Cash",
          icon: <Bus className="w-4 h-4" />,
          color: "bg-pink-500"
        }
      ]
    },
    {
      date: "2025-05-04",
      items: [
        {
          category: "Café/Restaurants",
          amount: 80,
          method: "Credit card №2",
          icon: <Coffee className="w-4 h-4" />,
          color: "bg-indigo-500"
        },
        {
          category: "Health",
          amount: 15,
          method: "Credit card №1",
          icon: <Plus className="w-4 h-4" />,
          color: "bg-green-500"
        }
      ]
    },
    {
      date: "2025-05-03",
      items: [
        {
          category: "Entertainment",
          amount: 15,
          method: "Credit card №1",
          icon: <Gamepad className="w-4 h-4" />,
          color: "bg-orange-500"
        },
        {
          category: "Transport",
          amount: 10,
          method: "Cash",
          icon: <Bus className="w-4 h-4" />,
          color: "bg-pink-500"
        },
        {
          category: "Shopping",
          amount: 53,
          method: "Credit card №1",
          icon: <Shirt className="w-4 h-4" />,
          color: "bg-cyan-500"
        },
        {
          category: "Transport",
          amount: 3,
          method: "Cash",
          icon: <Bus className="w-4 h-4" />,
          color: "bg-pink-500"
        }
      ]
    }
  ];

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
        title={`Welcome, ${user.name}`}
        description="Keep track your financial plan"
      />

      <DashboardHeaderActions />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side: charts and stats */}
        <DashboardLeftSection
          selectedMonth={selectedMonth}
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
