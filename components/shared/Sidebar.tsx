"use client";

import { MessageSquare, Settings, Menu } from "lucide-react";
import Image from "next/image";
import { NavigationItem } from "./NavigationItem";
import { Button } from "../ui/button/Button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen ${
        collapsed ? "w-20" : "w-64"
      } bg-[#0B0220] text-white flex flex-col justify-between py-6 px-4 transition-all duration-300`}
    >
      {/* Top Section */}
      <div>
        {/* Logo + Menu */}
        <div
          className={`flex items-center justify-between mb-8 px-2 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          {!collapsed && (
            <div className="text-lg font-semibold tracking-wide">🔄 Ringku</div>
          )}
          <Button size="sm" variant="ghost" onClick={() => setCollapsed(!collapsed)}>
            <Menu/>
          </Button>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col gap-1">
          <NavigationItem
            icon={<MessageSquare />}
            title="Chat"
            href="/"
            collapsed={collapsed}
          />
          <NavigationItem
            icon={<MessageSquare />}
            title="Chat"
            href="/chat-2"
            collapsed={collapsed}
          />
          <NavigationItem
            icon={<MessageSquare />}
            title="Chat"
            href="/chat-3"
            active
            collapsed={collapsed}
          />
          <NavigationItem
            icon={<MessageSquare />}
            title="Chat"
            href="/chat-4"
            badge={12}
            collapsed={collapsed}
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="space-y-6">
        <NavigationItem
          icon={<Settings />}
          title="Settings"
          href="/settings"
          collapsed={collapsed}
        />
        <div
          className={cn(
            "border-t border-white/10 pt-4 flex items-center gap-3 px-2",
            collapsed && "justify-center"
          )}
        >
          <Image
            src="/avatar.jpg"
            alt="avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          {!collapsed && (
            <span className="text-sm font-medium text-white">Adrian Tra</span>
          )}
        </div>
      </div>
    </aside>
  );
};
