"use client";
import React, { useEffect, useState } from "react";
import StatCard, { StatCardProps } from "../card/StatCard";
import { ArrowDownCircle, ArrowUpCircle, DollarSign } from "lucide-react";
import {
  getChartData,
  getIncomeExpenseComparison,
  getTopExpenseCategoriesForPieChart,
  getTopIncomeCategoriesForBarChart,
  getTransactionSummary
} from "@/lib/actions/transaction.action";
import StatisticHeader from "../shared/StatisticHeader";
import { TransactionChart } from "../chart/TransactionChart";
import { ExpensePieChart } from "../chart/ExpensePieChart";
import { IncomeBarChart } from "../chart/IncomeBarChart";
import { ChartDataItem, CategoryChartData, TrendResult } from "@/constant";

export default function TransactionChartForm({ userId }: { userId: string }) {
  const [chartType, setChartType] = useState<"general" | "income" | "expense">(
    "general"
  );
  const [timeRange, setTimeRange] = useState<"year" | "month" | "last7days">(
    "year"
  );
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    profit: 0
  });
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [expenseChartData, setexpenseChartData] = useState<CategoryChartData[]>(
    []
  );
  const [incomeChartData, setIncomeChartData] = useState<CategoryChartData[]>(
    []
  );
  const [outcomComparison, setexpenseComparison] = useState<TrendResult>();
  const [incomComparison, setIncomeComparison] = useState<TrendResult>();
  const statData: StatCardProps[] = [
    {
      icon: <ArrowDownCircle className="w-full h-full" />,
      label: "Lifetime Income",
      value: `${summary.income.toLocaleString()} VND`,
      bgColor: "bg-violet-100",
      iconColor: "text-violet-500"
    },
    {
      icon: <ArrowUpCircle className="w-full h-full" />,
      label: "Lifetime Expense",
      value: `${summary.expense.toLocaleString()} VND `,
      bgColor: "bg-red-100",
      iconColor: "text-red-500"
    },
    {
      icon: <DollarSign className="w-full h-full" />,
      label: "Lifetime Profit",
      value: `${summary.profit.toLocaleString()} VND `,
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    }
  ];

  useEffect(() => {
    async function fetchAllDashboardCharts() {
      try {
        const [
          summary,
          chartData,
          expensePieChartData,
          incomeBarChartData,
          comparison
        ] = await Promise.all([
          getTransactionSummary(userId),
          getChartData(userId, timeRange, chartType),
          getTopExpenseCategoriesForPieChart(userId),
          getTopIncomeCategoriesForBarChart(userId),
          getIncomeExpenseComparison(userId)
        ]);

        setSummary(summary);
        setChartData(chartData);
        setexpenseChartData(expensePieChartData);
        setIncomeChartData(incomeBarChartData);
        setIncomeComparison(comparison.income);
        setexpenseComparison(comparison.expense);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    }

    fetchAllDashboardCharts();
  }, [userId, timeRange, chartType]);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="w-full flex justify-between items-center px-12 py-3 gap-10">
        {statData.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </div>
      <div className="w-full flex flex-col px-12 py-6 items-center gap-9">
        <StatisticHeader
          chartType={chartType}
          setChartType={setChartType}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
        />
        <div className="w-full flex-1">
          <TransactionChart chartData={chartData} timeRange={timeRange} />
        </div>

        <div className="w-full flex flex-1 items-start justify-between gap-6 ">
          <div className="w-1/2 h-auto">
            <ExpensePieChart
              chartData={expenseChartData}
              trend={outcomComparison}
            />
          </div>
          <div className="flex-1 w-1/2 h-full">
            <IncomeBarChart
              chartData={incomeChartData}
              trend={incomComparison}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
