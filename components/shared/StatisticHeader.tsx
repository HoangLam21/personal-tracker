import React from "react";

export type ChartType = "general" | "income" | "outcome";
export type TimeRange = "year" | "month" | "last7days";

export interface StatisticHeaderProps {
  chartType: ChartType;
  setChartType: (value: ChartType) => void;
  timeRange: TimeRange;
  setTimeRange: (value: TimeRange) => void;
}

const chartOptions: { label: string; value: ChartType }[] = [
  { label: "General", value: "general" },
  { label: "Income Chart", value: "income" },
  { label: "Outcome Chart", value: "outcome" }
];

const timeOptions: { label: string; value: TimeRange }[] = [
  { label: "This Year", value: "year" },
  { label: "This Month", value: "month" },
  { label: "Last 7 Days", value: "last7days" }
];

const StatisticHeader: React.FC<StatisticHeaderProps> = ({
  chartType,
  setChartType,
  timeRange,
  setTimeRange
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <h2 className="text-2xl font-semibold text-custom-100">Statistic</h2>
      <div className="flex gap-3">
        {/* Chart Type Dropdown */}
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value as ChartType)}
          className="px-4 py-2 rounded-[6px] border border-custom-40 text-custom-90 text-[14px] shadow-sm font-normal"
        >
          {chartOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Time Range Dropdown */}
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as TimeRange)}
          className="px-4 py-2 rounded-[6px] border border-custom-40 text-custom-90 text-sm shadow-sm font-normal"
        >
          {timeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default StatisticHeader;
