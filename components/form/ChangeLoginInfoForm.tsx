"use client";
import React, { useState, useEffect } from "react";

const ChangeLoginInfoForm = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!email || !phone) {
      setError("Please fill in both fields.");
      setIsValid(false);
    } else {
      setError(null);
      setIsValid(true);
    }
  }, [email, phone]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    alert("Login info updated!");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md w-md">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-10 border px-3 rounded-md"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full h-10 border px-3 rounded-md"
          required
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
