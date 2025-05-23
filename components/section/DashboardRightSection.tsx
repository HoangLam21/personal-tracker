/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";
import DashboardSpendingDayForm from "../form/DashboardSpendingDayForm";

type Props = {
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  isCurrentMonth: boolean;
  filteredSpending: {
    dateKey: string;
    dayTitle: string;
    items: any[];
  }[];
};

const DashboardRightSection = ({
  selectedMonth,
  setSelectedMonth,
  isCurrentMonth,
  filteredSpending
}: Props) => {
  return (
    <div className="lg:w-[320px] max-h-[830px] h-[830px] overflow-y-auto border border-gray-200 rounded-xl p-4 flex flex-col gap-4 shadow-sm bg-white">
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() =>
            setSelectedMonth(
              dayjs(selectedMonth).subtract(1, "month").format("YYYY-MM")
            )
          }
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h4 className="font-semibold">
          {dayjs(selectedMonth).format("MMMM YYYY")}
        </h4>
        <button
          onClick={() =>
            !isCurrentMonth &&
            setSelectedMonth(
              dayjs(selectedMonth).add(1, "month").format("YYYY-MM")
            )
          }
          disabled={isCurrentMonth}
          className={`p-1 rounded-full ${
            isCurrentMonth ? "text-gray-400" : "hover:bg-gray-100 text-black"
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {filteredSpending.map((group) => (
        <DashboardSpendingDayForm
          key={group.dateKey}
          dayTitle={group.dayTitle}
          items={group.items}
        />
      ))}
    </div>
  );
};

export default DashboardRightSection;
