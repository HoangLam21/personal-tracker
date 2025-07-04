import Link from "next/link";
import { cn } from "@/lib/utils";

type NavigationItemProps = {
  icon: React.ReactNode;
  title: string;
  href: string;
  active?: boolean;
  badge?: number;
  collapsed?: boolean;
  className?: string;
};

export const NavigationItem = ({
  icon,
  title,
  href,
  active = false,
  badge,
  collapsed = false,
  className,
}: NavigationItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-between px-4 py-2.5 rounded-md transition-colors group",
        active
          ? "bg-white/10 text-white font-semibold"
          : "text-gray-300 hover:bg-white/10",
        collapsed && "px-3 justify-center",
        className
      )}
    >
      <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
        <span className="w-5 h-5 text-white">{icon}</span>
        {!collapsed && (
          <span className="font-bold text-lg truncate">{title}</span>
        )}
      </div>

      {/* Badge hiển thị nếu có và không bị collapse */}
      {!collapsed && badge !== undefined && (
        <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );
};
