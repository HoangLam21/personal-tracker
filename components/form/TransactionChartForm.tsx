"use client";
import React, { useEffect, useState } from "react";
import StatCard, { StatCardProps } from "../card/StatCard";
import { ArrowDownCircle, ArrowUpCircle, DollarSign } from "lucide-react";
import {
  getChartData,
  getTransactionSummary
} from "@/lib/actions/transaction.action";
import StatisticHeader from "../shared/StatisticHeader";
import { TransactionChart } from "../chart/TransactionChart";

export default function TransactionChartForm({ userId }: { userId: string }) {
  const [chartType, setChartType] = useState<"general" | "income" | "outcome">(
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
  const [chartData, setChartData] = useState<
    { month: string; income: number; outcome: number }[]
  >([]);
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
      label: "Lifetime Outcome",
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
    async function fetchSummary() {
      const data = await getTransactionSummary(userId);
      setSummary(data);
    }

    async function fetchChartData() {
      const data = await getChartData(userId, timeRange, chartType);
      setChartData(data);
    }

    fetchSummary();
    fetchChartData();
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
        <div className="w-full h-full">
          <TransactionChart chartData={chartData} timeRange={timeRange} />
        </div>
      </div>
    </div>
  );
}
