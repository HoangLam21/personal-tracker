import React from "react";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "default" | "filled" | "outline";
};

export const Input = ({
  variant = "default",
  className,
  ...props
}: InputProps) => {
  const baseClasses =
    "w-full px-4 py-2 rounded-full text-sm transition duration-150 ease-in-out focus:ring-2 focus:ring-indigo-600 focus:outline-none";

  const variants = {
    default: "bg-white border border-gray-200 text-gray-900 shadow-sm",
    filled: "bg-gray-100 border border-gray-200 text-gray-700 shadow-inner",
    outline: "bg-transparent border border-indigo-500 text-gray-900",
  };

  return (
    <input
      {...props}
      className={cn(baseClasses, variants[variant], className)}
    />
  );
};
