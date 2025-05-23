"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface SettingSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const SettingSection = ({
  title,
  children,
  defaultOpen = true
}: SettingSectionProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="w-full">
      {/* Header with toggle */}
      <div className="flex items-center justify-between px-12 pt-4 pb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          {open ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </div>

      {/* Nội dung có thể gập lại */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="px-12 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center w-full py-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingSection;
