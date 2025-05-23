"use client";

import { Card, CardContent } from "@/components/ui/card/card";
import { ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/lib/utils";
import DashboardPieChart from "../chart/DashboardPieChart";

type Props = {
  title: string;
  data: { name: string; value: number; color: string }[];
};

const DashboardChartCard = ({ title, data }: Props) => {
  const mid = Math.ceil(data.length / 2);

  return (
    <Card className="border border-gray-200 rounded-xl shadow-sm h-full">
      <CardContent className="px-4 pt-0 gap-3 h-full flex flex-col">
        <h3 className="font-semibold mb-4 flex items-center justify-between">
          {title}
          <span className="text-sm text-muted-foreground">✏️</span>
        </h3>

        <div className="flex items-center flex-1">
          <ResponsiveContainer width="60%" height={180}>
            <DashboardPieChart data={data} />
          </ResponsiveContainer>

          <div className="grid grid-cols-2 w-full divide-x divide-gray-300">
            <div className="flex flex-col gap-2 pr-4">
              {data.slice(0, mid).map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2 text-sm"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span>{item.name}</span>
                  <span className="ml-auto font-medium">
                    {formatCurrency(item.value)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 pl-4">
              {data.slice(mid).map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2 text-sm"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span>{item.name}</span>
                  <span className="ml-auto font-medium">
                    {formatCurrency(item.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardChartCard;
