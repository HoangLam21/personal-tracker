import React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";

type Option = { label: string; value: string };

type SelectionProps = {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  variant?: "default" | "filled" | "outline" | "button";
  className?: string;
};

export const Selection = ({
  options,
  value,
  onChange,
  variant = "default",
  className,
}: SelectionProps) => {
  const baseClasses =
    "w-full relative px-4 py-2 rounded-md text-sm transition duration-150 ease-in-out";

  const variants = {
    default:
      "bg-white border border-gray-200 text-gray-900 shadow-sm focus-within:ring-2 focus-within:ring-indigo-600",
    filled:
      "bg-gray-100 border border-gray-200 text-gray-700 shadow-inner focus-within:ring-2 focus-within:ring-indigo-600",
    outline:
      "bg-white border border-indigo-500 text-gray-900 shadow-sm focus-within:ring-2 focus-within:ring-indigo-600",
    button:
      "bg-white border border-indigo-500 text-gray-900 shadow-sm hover:bg-gray-50",
  };

  if (variant !== "button") {
    return (
      <div className={cn(baseClasses, variants[variant], className)}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full bg-transparent pr-8 outline-none appearance-none",
            "font-medium text-inherit"
          )}
        >
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="text-gray-900 bg-white"
            >
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
      </div>
    );
  }

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || "Select";

  return (
    <button
      className={cn(
        baseClasses,
        variants.button,
        "flex items-center justify-between px-4",
        className
      )}
      onClick={() => console.log("Open custom select modal")}
    >
      <span>{selectedLabel}</span>
      <ChevronRight className="w-4 h-4 text-indigo-600" />
    </button>
  );
};
