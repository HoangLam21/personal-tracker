import React from "react";
import StatCard, { StatCardProps } from "../card/StatCard";
import { ArrowDownCircle, ArrowUpCircle, DollarSign } from "lucide-react";
import { getTransactionSummary } from "@/lib/actions/transaction.action";

const TransactionChartForm = async ({ userId }: { userId: string }) => {
  const summary = await getTransactionSummary(userId);
  const statData: StatCardProps[] = [
    {
      icon: <ArrowDownCircle className="w-full h-full" />,
      label: "Lifetime Income",
      value: `$${summary.income.toLocaleString()}`,
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: <ArrowUpCircle className="w-full h-full" />,
      label: "Lifetime Outcome",
      value: `$${summary.expense.toLocaleString()}`,
      bgColor: "bg-red-100",
      iconColor: "text-red-500"
    },
    {
      icon: <DollarSign className="w-full h-full" />,
      label: "Lifetime Profit",
      value: `$${summary.profit.toLocaleString()}`,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    }
  ];

  return (
    <div className="flex flex-col w-full items-center">
      <div className="w-full flex justify-between items-center px-12 py-3 gap-10">
        {statData.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </div>
      <div className="w-full">Chart</div>
    </div>
  );
};

export default TransactionChartForm;
