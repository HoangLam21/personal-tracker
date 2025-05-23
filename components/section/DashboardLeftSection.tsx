"use client";

import dayjs from "dayjs";
import StatCard from "../card/StatCard";
import DashboardChartCard from "../card/DashboardChartCard";

type Props = {
  selectedMonth: string;
  incomeCategories: { name: string; value: number; color: string }[];
  expenseCategories: { name: string; value: number; color: string }[];
  statItems: {
    icon: React.ReactNode;
    bgColor: string;
    label: string;
    value: string;
    isDashboard?: boolean;
  }[];
};

const DashboardLeftSection = ({
  selectedMonth,
  incomeCategories,
  expenseCategories,
  statItems
}: Props) => {
  return (
    <div className="flex-1 flex flex-col gap-6 h-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 border border-gray-200 rounded-xl shadow-sm">
        {statItems.map((item, index) => (
          <StatCard key={index} {...item} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-rows-[auto_auto] gap-6">
        <DashboardChartCard
          title={`${dayjs(selectedMonth).format("MMMM")} Expenses`}
          data={expenseCategories}
        />

        <DashboardChartCard
          title={`${dayjs(selectedMonth).format("MMMM")} Incomes`}
          data={incomeCategories}
        />
      </div>
    </div>
  );
};

export default DashboardLeftSection;
