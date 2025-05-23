"use client";

import dayjs from "dayjs";
import DashboardAction from "./DashboardAction";

export default function DashboardHeaderActions() {
  const today = dayjs().format("MMMM D, YYYY");

  return (
    <div className="flex justify-between items-center">
      <h3 className="text-muted-foreground text-md">{today}</h3>
      <div className="flex gap-2">
        <DashboardAction type="income" />
        <DashboardAction type="expense" />
      </div>
    </div>
  );
}
