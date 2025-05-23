import { ReactNode } from "react";
import { formatCurrency } from "@/lib/utils";

type Props = {
  icon: ReactNode;
  color: string;
  category: string;
  method: string;
  amount: number;
};

const DashboardSpendingCard = ({
  icon,
  color,
  category,
  method,
  amount
}: Props) => {
  return (
    <div className="flex justify-between items-center py-2 text-sm">
      <div className="flex items-center gap-2">
        <div
          className={`w-8 h-8 rounded-md ${color} flex items-center justify-center text-white`}
        >
          {icon}
        </div>
        <div>
          <p className="font-medium">{category}</p>
          <p className="text-xs text-gray-500">{method}</p>
        </div>
      </div>
      <span className="font-semibold">{formatCurrency(amount)}</span>
    </div>
  );
};

export default DashboardSpendingCard;
