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
  outcome: {
    label: "Outcome",
    color: "#F93939"
  }
} satisfies ChartConfig;

interface Props {
  chartData: { month: string; income: number; outcome: number }[];
  timeRange: "year" | "month" | "last7days";
}

export function TransactionChart({ chartData, timeRange }: Props) {
  const hasIncome = chartData.some((item) => item.income > 0);
  const hasOutcome = chartData.some((item) => item.outcome > 0);

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

        {hasOutcome && (
          <Area
            dataKey="outcome"
            type="natural"
            fill={chartConfig.outcome.color}
            fillOpacity={0.4}
            stroke={chartConfig.outcome.color}
            stackId="a"
          />
        )}

        {hasIncome && (
          <Area
            dataKey="income"
            type="natural"
            fill={chartConfig.income.color}
            fillOpacity={0.4}
            stroke={chartConfig.income.color}
            stackId="a"
          />
        )}
      </AreaChart>
    </ChartContainer>
  );
}
