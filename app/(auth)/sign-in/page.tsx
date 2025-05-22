"use client";

import { Button } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input/Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");

  const isEmail = (value: string) => value.includes("@");
  const isPhone = (value: string) => /^\d{9,11}$/.test(value);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const identifier = form.get("email")?.toString().trim() || "";

    // ✅ Kiểm tra định dạng hợp lệ
    if (!isEmail(identifier) && !isPhone(identifier)) {
      alert("Please enter a valid email or phone number.");
      return;
    }

    const res = await signIn("credentials", {
      email: identifier,
      password: form.get("password"),
      redirect: false,
      callbackUrl: "/dashboard"
    });

    if (res?.ok && res.url) {
      router.push(res.url);
    } else {
      setError("Sai email hoặc mật khẩu");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-3 max-w-[400px]">
      <Input
        name="email"
        type="text"
        required
        placeholder="Email or phone number"
        value={emailOrPhone}
        onChange={(e) => setEmailOrPhone(e.target.value)}
      />

      <Input name="password" type="password" required placeholder="Password" />
      <Button type="submit">Đăng nhập</Button>
      <Button variant="outline" onClick={() => signIn("google")}>
        Đăng nhập với Google
      </Button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
