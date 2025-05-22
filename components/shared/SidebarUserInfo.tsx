"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SidebarUserInfo({ collapsed }: { collapsed: boolean }) {
  const [user, setUser] = useState<{ name: string; avatar: string }>({
    name: "",
    avatar: "/avatar.png"
  });

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
    <div
      className={`border-t border-white/10 pt-4 flex items-center gap-3 px-2 ${
        collapsed ? "justify-center" : ""
      }`}
    >
      <Image
        src={user.avatar}
        alt="avatar"
        width={32}
        height={32}
        className="rounded-full"
      />
      {!collapsed && (
        <span className="text-sm font-medium text-white">{user.name}</span>
      )}
    </div>
  );
}
