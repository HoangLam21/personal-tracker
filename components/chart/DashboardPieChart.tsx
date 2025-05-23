"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "../ui/chart/chart";
import { formatCurrency } from "@/lib/utils";

type Props = {
  data: { name: string; value: number; color: string }[];
  title: string;
};

const DashboardPieChart = ({ data, title }: Props) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const chartConfig: ChartConfig = {
    summary: { label: title }
  };

  data.forEach((item) => {
    chartConfig[item.name] = {
      label: item.name,
      color: item.color
    };
  });
  return (
    <ResponsiveContainer width="100%" height={240}>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[240px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (
                  viewBox &&
                  "cx" in viewBox &&
                  "cy" in viewBox &&
                  "innerRadius" in viewBox &&
                  "outerRadius" in viewBox
                ) {
                  const cx = viewBox.cx;
                  const cy = viewBox.cy;
                  const radius =
                    (viewBox.outerRadius ?? 0) - (viewBox.innerRadius ?? 0);
                  const fontSize = Math.max(16, radius * 0.4);
                  return (
                    <text
                      x={cx}
                      y={cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={cx}
                        y={cy}
                        className="fill-foreground font-bold"
                        style={{ fontSize }}
                      >
                        {formatCurrency(total)}
                      </tspan>
                      <tspan
                        x={cx}
                        y={(cy ?? 0) + 16}
                        className="fill-muted-foreground font-medium"
                        style={{ fontSize: fontSize * 0.6 }}
                      >
                        {title}
                      </tspan>
                    </text>
                  );
                }
                return null;
              }}
            />

            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    </ResponsiveContainer>
  );
};

export default DashboardPieChart;
