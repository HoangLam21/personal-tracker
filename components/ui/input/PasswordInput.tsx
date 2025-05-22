"use client";
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input/Input";
interface PasswordInputProps {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  show: boolean;
  toggleShow: () => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  label,
  value,
  onChange,
  show,
  toggleShow
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <div className="relative">
        <Input
          name={name}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-10 border px-3 rounded-md pr-10"
          required
        />
        <button
          type="button"
          onClick={toggleShow}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 cursor-pointer"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
