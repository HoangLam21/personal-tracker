"use client";

import {
  ChartBar,
  Wallet,
  LayoutDashboard,
  Menu,
  Settings,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NavigationItem } from "./NavigationItem";
import { Button } from "../ui/button/Button";
import { cn } from "@/lib/utils";
import SidebarUserInfo from "./SidebarUserInfo";
import { signOut } from "next-auth/react";
import { useUserContext } from "@/context/UserContext";
import Image from "next/image";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { setUser } = useUserContext();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();
        if (res.ok) setUser(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        console.error("Failed to fetch user profile");
      }
    };
    fetchUser();
  }, []);
  return (
    <aside
      className={cn(
        "h-screen bg-[#0B0220] text-white flex flex-col justify-between py-6 px-4 transition-all duration-300",
        collapsed ? "w-20" : "w-80"
      )}
    >
      {/* Top Section */}
      <div>
        {/* Logo + Toggle Button */}
        <div
          className={cn(
            "flex items-center justify-between mb-8 px-2",
            collapsed && "justify-center"
          )}
        >
          {!collapsed && (
            <div className="flex flex-row gap-3 items-center justify-between">
              <Image src="/Logo.jpg" alt="Logo" width={40} height={40} className="rounded-full"/>
              <div className="text-xl font-semibold tracking-wide">
                Personal Tracker
              </div>
            </div>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu />
          </Button>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col gap-1">
          <NavigationItem
            icon={<LayoutDashboard />}
            title="Trang chủ"
            href="/dashboard"
            active={pathname.startsWith("/dashboard")}
            collapsed={collapsed}
          />
          <NavigationItem
            icon={<Wallet />}
            title="Tài chính"
            href="/finance"
            active={pathname.startsWith("/finance")}
            collapsed={collapsed}
          />
          <NavigationItem
            icon={<ChartBar />}
            title="Biểu đồ"
            href="/chart"
            active={pathname.startsWith("/chart")}
            collapsed={collapsed}
            //badge={3}
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="space-y-6">
        <NavigationItem
          icon={<Settings />}
          title="Cài đặt"
          href="/settings"
          active={pathname.startsWith("/settings")}
          collapsed={collapsed}
        />
        <SidebarUserInfo collapsed={collapsed} />
        {!collapsed && (
          <Button
            variant="default"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/sign-in" })}
            className="text-white w-full flex items-center gap-2 px-2 py-4 h-10 cursor-pointer hover:bg-white/10 rounded-md transition"
          >
            <LogOut size={16} />
            <span className="text-sm font-medium">Đăng xuất</span>
          </Button>
        )}
      </div>
    </aside>
  );
};
