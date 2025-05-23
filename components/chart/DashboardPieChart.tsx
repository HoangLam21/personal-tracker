"use client";

import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

type Props = {
  data: { name: string; value: number; color: string }[];
};

const DashboardPieChart = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <PieChart>
        <Tooltip />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DashboardPieChart;
