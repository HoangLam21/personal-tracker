"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input/Input";
import { Button } from "@/components/ui/button/Button";

export default function SignupPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        phoneNumber: form.get("phoneNumber"),
        password: form.get("password")
      }),
      headers: { "Content-Type": "application/json" }
    });

    if (res.ok) {
      router.push("/sign-in");
    } else {
      const result = await res.json();
      setError(result.error || "Đăng ký thất bại");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-xl space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Tạo tài khoản
          </h1>
          <p className="text-sm text-gray-500">
            Điền thông tin bên dưới để bắt đầu
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="name" required placeholder="Họ và tên" />
          <Input name="email" required type="email" placeholder="Email" />
          <Input name="phoneNumber" required placeholder="Số điện thoại" />
          <Input
            name="password"
            required
            type="password"
            placeholder="Mật khẩu"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" className="w-full">
            Đăng ký
          </Button>
          <p className="text-sm text-center text-gray-500">
            Đã có tài khoản?{" "}
            <a href="/sign-in" className="text-blue-500 hover:underline">
              Đăng nhập
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
