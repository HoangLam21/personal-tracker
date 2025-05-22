"use client";
import { useEffect, useState, useRef } from "react";
import { Input } from "../ui/input/Input";
import Image from "next/image";
import { useUserContext } from "@/context/UserContext";
import { uploadAvatarToServer } from "@/lib/actions/user.action";

export default function ChangeProfileForm() {
  const { user, setUser } = useUserContext();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(user.avatar); // URL string
  const [avatarFile, setAvatarFile] = useState<File | null>(null); // file thực tế
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!name && !avatarFile) {
      setIsValid(false);
      setError("Name or Avatar is required.");
    } else {
      setIsValid(true);
      setError(null);
    }
  }, [name, avatarFile, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    let avatarUrl = avatar;

    try {
      if (avatarFile) {
        avatarUrl = await uploadAvatarToServer(avatarFile);
      }
      setUser({
        ...user,
        name: name ? name : user.name,
        avatar: avatarFile ? URL.createObjectURL(avatarFile) : user.avatar
      });
      const res = await fetch("/api/update-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, avatar: avatarUrl })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Update failed");
      } else {
        alert("Profile updated!");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(URL.createObjectURL(file)); // hiển thị preview
      setAvatarFile(file); // lưu file thực tế
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-md w-full"
    >
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Avatar</label>

        {/* Hiển thị ảnh có thể click */}
        <div>
          <label htmlFor="avatar-upload" className="cursor-pointer w-fit block">
            <div className="w-[120px] h-[120px] relative overflow-hidden rounded-full">
              <Image
                src={avatar || user.avatar || "/avatar.png"}
                alt="avatar preview"
                fill
                className="rounded-full object-cover border-2 border-gray-300 hover:opacity-80 transition"
              />
            </div>
          </label>

          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Name</label>
        <Input
          value={name}
          placeholder={user.name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={!isValid}
        className={`bg-indigo-600 text-white hover:bg-indigo-500 transition py-2 rounded-md ${
          !isValid ? "opacity-50 cursor-not-allowed" : " cursor-pointer"
        }`}
      >
        Update Profile
      </button>
    </form>
  );
}
