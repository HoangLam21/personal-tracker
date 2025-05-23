import { CategoryChartData } from "@/constant";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSixMonthRange(): string {
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

export function generateChartConfig(
  data: CategoryChartData[],
  colors: string[]
): Record<string, { label: string; color: string }> {
  return data.reduce((acc, item, index) => {
    const color = colors[index % colors.length] || "#6B7280";
    acc[item.category] = {
      label: item.category,
      color
    };
    item.fill = color;
    return acc;
  }, {} as Record<string, { label: string; color: string }>);
}

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount);
