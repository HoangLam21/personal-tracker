"use client";
import React, { useState, useEffect } from "react";

const ChangeLoginInfoForm = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!email && !phone) {
      setError("Please fill in any fields.");
      setIsValid(false);
    } else {
      setError(null);
      setIsValid(true);
    }
  }, [email, phone]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/update-account", {
      method: "POST",
      body: JSON.stringify({
        email: form.get("email"),
        phoneNumber: form.get("phoneNumber")
      }),
      headers: { "Content-Type": "application/json" }
    });
    if (res.ok) {
      setEmail("");
      setPhone("");
      const result = await res.json();
      alert(result.message);
    } else {
      const result = await res.json();
      setError(result.error || "Fail to change password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md w-md">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Email</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-10 border px-3 rounded-md"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Phone Number</label>
        <input
          name="phoneNumber"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full h-10 border px-3 rounded-md"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={!isValid}
        className={`bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition ${
          !isValid ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Update Login Info
      </button>
    </form>
  );
};

export default ChangeLoginInfoForm;
