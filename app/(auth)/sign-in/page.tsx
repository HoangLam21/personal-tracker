// app/login/page.tsx
"use client";

import { Button } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input/Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
      callbackUrl: "/dashboard"
    });

    if (res?.ok && res.url) {
      router.push(res.url); // chính xác hơn
    } else {
      setError("Sai email hoặc mật khẩu");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-3 max-w-[400px]">
      <Input
        name="email"
        type="email"
        required
        placeholder="Email or Phone number"
      />
      <Input name="password" type="password" required placeholder="Password" />
      <Button type="submit">Đăng nhập</Button>
      <Button variant="outline" onClick={() => signIn("google")}>
        Đăng nhập với google
      </Button>
      {error && <p>{error}</p>}
    </form>
  );
}
