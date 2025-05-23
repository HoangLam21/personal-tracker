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
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(amount);

// Tailwind màu 500 làm chuẩn để so sánh
const tailwind500RGB = {
  red: [239, 68, 68],
  orange: [249, 115, 22],
  yellow: [234, 179, 8],
  green: [34, 197, 94],
  blue: [59, 130, 246],
  purple: [139, 92, 246],
  pink: [236, 72, 153],
  gray: [156, 163, 175]
};

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function colorDistance(
  a: [number, number, number],
  b: [number, number, number]
) {
  return Math.sqrt(
    (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2
  );
}

export function mapHexToTailwind500(hex: string): string {
  const input = hexToRgb(hex);
  let closest = "gray";
  let minDist = Infinity;

  for (const [name, rgb] of Object.entries(tailwind500RGB)) {
    const d = colorDistance(input, rgb as [number, number, number]);
    if (d < minDist) {
      minDist = d;
      closest = name;
    }
  }

  return `bg-${closest}-500`;
}
