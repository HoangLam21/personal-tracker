export interface TransactionSummary {
  income: number;
  expense: number;
  profit: number;
}

export interface ChartDataItem {
  month: string; // or day (e.g., "01", "02")
  income: number;
  expense: number;
}

export interface CategoryChartData {
  category: string;
  value: number;
  fill: string;
}

export interface ComparisonData {
  direction: string;
  percentage: number;
}

export interface TrendResult {
  direction: "up" | "down" | "same";
  percentage: number;
  current: number;
  previous: number;
}

import {
  Plus,
  ShoppingCart,
  Gift,
  Bus,
  Coffee,
  Gamepad,
  Shirt,
  Utensils,
  Smile,
  Plane,
  Monitor,
  BookOpen,
  Home
} from "lucide-react";
import { ReactElement } from "react";

export function getCategoryIcon(category: string): ReactElement | null {
  const key = category.toLowerCase();

  switch (key) {
    case "health":
      return <Plus className="w-4 h-4" />;
    case "groceries":
    case "food":
      return <Utensils className="w-4 h-4" />;
    case "gifts":
      return <Gift className="w-4 h-4" />;
    case "transport":
      return <Bus className="w-4 h-4" />;
    case "café":
    case "restaurants":
    case "café/restaurants":
      return <Coffee className="w-4 h-4" />;
    case "entertainment":
      return <Gamepad className="w-4 h-4" />;
    case "shopping":
      return <ShoppingCart className="w-4 h-4" />;
    case "beauty":
      return <Smile className="w-4 h-4" />;
    case "travel":
      return <Plane className="w-4 h-4" />;
    case "tech":
      return <Monitor className="w-4 h-4" />;
    case "book":
    case "books":
      return <BookOpen className="w-4 h-4" />;
    case "house":
    case "home":
      return <Home className="w-4 h-4" />;
    case "clothing":
      return <Shirt className="w-4 h-4" />;
    default:
      return <ShoppingCart className="w-4 h-4" />; // fallback icon
  }
}
