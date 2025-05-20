// app/signup/page.tsx
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

    if (res.ok) router.push("/sign-in");
    else {
      const result = await res.json();
      setError(result.error || "Đăng ký thất bại");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-[400px]">
      <Input name="name" required placeholder="Fullname" />
      <Input name="email" required placeholder="Email" />
      <Input name="phoneNumber" required placeholder="phoneNumber" />
      <Input name="password" required placeholder="Password" />
      <Button type="submit">Đăng ký</Button>
      {error && <p>{error}</p>}
    </form>
  );
}
