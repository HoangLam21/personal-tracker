"use client";
import { useUserContext } from "@/context/UserContext";
import Image from "next/image";

export default function SidebarUserInfo({ collapsed }: { collapsed: boolean }) {
  const { user } = useUserContext();

  return (
    <div
      className={`border-t border-white/10 pt-4 flex items-center gap-3 px-2 w-fit ${
        collapsed ? "justify-center" : ""
      }`}
    >
      <div className="w-8 h-8 relative rounded-full overflow-hidden">
        <Image
          src={user.avatar || "/avatar.png"}
          alt="avatar"
          fill
          className="object-cover"
        />
      </div>

      {!collapsed && (
        <span className="text-sm font-medium text-white">{user.name}</span>
      )}
    </div>
  );
}
