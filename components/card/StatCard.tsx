import React from "react";

export interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  bgColor?: string;
  iconColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  bgColor = "bg-custom-30",
  iconColor = "text-red-500"
}) => {
  return (
    <div className="flex items-center gap-[18px] py-3 px-[14px] rounded-[6px] shadow-sm border border-custom-40 bg-white w-full max-w-md">
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center ${bgColor}`}
      >
        <div className={`w-6 h-6 ${iconColor}`}>{icon}</div>
      </div>
      <div className="w-full">
        <p className="text-custom-70 text-[14px] font-normal">{label}</p>
        <p className="text-custom-90 text-[18px] font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
