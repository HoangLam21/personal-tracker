/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Pie, PieChart } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart/chart";
import { generateChartConfig, getSixMonthRange } from "@/lib/utils";
import { CategoryChartData, TrendResult } from "@/constant";
import { TrendingUp } from "lucide-react";

const pieColors = ["#061246", "#2E4CE8", "#BAC3F8", "#6B7280"];
export function ExpensePieChart({
  chartData,
  trend
}: {
  chartData: CategoryChartData[];
  trend: TrendResult | undefined;
}) {
  const chartConfig = generateChartConfig(chartData, pieColors);
  const { direction, percentage } = trend ?? {
    direction: undefined,
    percentage: undefined
  };
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expense Categories</CardTitle>
        <CardDescription>{getSixMonthRange()}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="category" hideLabel />}
            />

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="category"
              outerRadius={120}
            >
              {/* <LabelList
                dataKey="category"
                stroke="none"
                fontSize={12}
                className="fill-background"
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              /> */}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="category" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center mt-2"
            />
          </PieChart>
        </ChartContainer>
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
              <>Expenses remains the same as previous 6 months</>
            )}
          </div>

          <div className="leading-none text-muted-foreground">
            Showing total expenses for the last 6 months
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
