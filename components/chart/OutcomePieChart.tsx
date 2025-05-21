/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart/chart";
import { PieChartData } from "@/constant";

const renderCustomLabel = (props: any) => {
  const { cx, cy, midAngle, outerRadius, percent, name } = props;
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 10;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.05) return null;

  return (
    <text
      x={x}
      y={y}
      fill="#000"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
    >
      {name}
    </text>
  );
};

function getSixMonthRange(): string {
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth(), 1);
  const start = new Date(end);
  start.setMonth(end.getMonth() - 5);
  const format = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric"
  });
  return `${format.format(start)} - ${format.format(end)}`;
}
function generateChartConfig(data: PieChartData[]): ChartConfig {
  return data.reduce((acc, item) => {
    acc[item.category] = {
      label: item.category,
      color: item.fill
    };
    return acc;
  }, {} as ChartConfig);
}

export function OutcomePieChart({ chartData }: { chartData: PieChartData[] }) {
  const chartConfig = generateChartConfig(chartData);
  return (
    <Card className="flex flex-col ">
      <CardHeader className="items-center pb-0">
        <CardTitle>Outcome Categories</CardTitle>
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
              <LabelList
                dataKey="category"
                stroke="none"
                fontSize={12}
                className="fill-background"
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
                content={renderCustomLabel}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="category" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center mt-2"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
