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
