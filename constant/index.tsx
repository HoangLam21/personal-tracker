export interface TransactionSummary {
  income: number;
  expense: number;
  profit: number;
}

export interface ChartDataItem {
  month: string; // or day (e.g., "01", "02")
  income: number;
  outcome: number;
}

export interface PieChartData {
  category: string;
  value: number;
  fill: string;
}
