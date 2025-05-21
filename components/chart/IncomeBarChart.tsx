"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart/chart";
import { CategoryChartData, TrendResult } from "@/constant";
import { generateChartConfig, getSixMonthRange } from "@/lib/utils";

const topColors = ["#4F46E5", "#3B82F6", "#8B5CF6", "#F59E0B"];
export function IncomeBarChart({
  chartData,
  trend
}: {
  chartData: CategoryChartData[];
  trend: TrendResult | undefined;
}) {
  const chartConfig = generateChartConfig(chartData, topColors);
  const { direction, percentage } = trend ?? {
    direction: undefined,
    percentage: undefined
  };
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Income Categories</CardTitle>
        <CardDescription>{getSixMonthRange()}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0
            }}
          >
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                String(
                  chartConfig[value as keyof typeof chartConfig]?.label ?? ""
                )
              }
            />
            <XAxis dataKey="value" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {direction === "up" && (
            <>
              Trending up by {percentage}% this month{" "}
              <TrendingUp className="h-4 w-4 text-green-500" />
            </>
          )}
          {direction === "down" && (
            <>
              Trending down by {percentage}% this month{" "}
              <TrendingUp className="h-4 w-4 rotate-180 text-red-500" />
            </>
          )}
          {direction === "same" && (
            <>Income remains the same as previous 6 months</>
          )}
        </div>

        <div className="leading-none text-muted-foreground">
          Showing total incomes for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
