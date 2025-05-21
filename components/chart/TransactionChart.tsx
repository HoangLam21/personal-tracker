"use client";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "../ui/chart/chart";

const chartConfig = {
  income: {
    label: "Income",
    color: "#4F46E5"
  },
  expense: {
    label: "Expense",
    color: "#F93939"
  }
} satisfies ChartConfig;

interface Props {
  chartData: { month: string; income: number; expense: number }[];
  timeRange: "year" | "month" | "last7days";
}

export function TransactionChart({ chartData, timeRange }: Props) {
  const hasIncome = chartData.some((item) => item.income > 0);
  const hasExpense = chartData.some((item) => item.expense > 0);

  const formatXAxis = (value: string) => {
    if (timeRange === "year") return value.slice(0, 3);
    if (timeRange === "month" || timeRange === "last7days") {
      return String(parseInt(value, 10));
    }
    return value;
  };

  const formatYAxis = (value: number) => {
    return `${value.toLocaleString()}`;
  };

  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 0,
          right: 0
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={formatXAxis}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickCount={4}
          tickFormatter={formatYAxis}
          width={70}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />

        {hasExpense && (
          <Area
            dataKey="expense"
            type="natural"
            fill={chartConfig.expense.color}
            fillOpacity={hasIncome && hasExpense ? 0.4 : 0}
            stroke={chartConfig.expense.color}
            stackId={hasIncome && hasExpense ? "a" : undefined}
          />
        )}

        {hasIncome && (
          <Area
            dataKey="income"
            type="natural"
            fill={chartConfig.income.color}
            fillOpacity={hasIncome && hasExpense ? 0.4 : 0}
            stroke={chartConfig.income.color}
            stackId={hasIncome && hasExpense ? "a" : undefined}
          />
        )}
      </AreaChart>
    </ChartContainer>
  );
}
