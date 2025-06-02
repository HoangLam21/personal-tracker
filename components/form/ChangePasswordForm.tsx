"use client";
import React, { useEffect, useState } from "react";
import PasswordInput from "../ui/input/PasswordInput";

interface PasswordField {
  key: "current" | "new" | "confirm";
  label: string;
}

const fields: PasswordField[] = [
  { key: "current", label: "Current Password" },
  { key: "new", label: "New Password" },
  { key: "confirm", label: "Confirm Password" }
];

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      setIsValid(false);
    } else if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      setIsValid(false);
    } else if (newPassword === currentPassword) {
      setError("New password must be different from current password.");
      setIsValid(false);
    } else {
      setError(null);
      setIsValid(true);
    }
  }, [currentPassword, newPassword, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/change-password", {
      method: "POST",
      body: JSON.stringify({
        currentPassword: form.get("current"),
        newPassword: form.get("new")
      }),
      headers: { "Content-Type": "application/json" }
    });
    if (res.ok) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      alert("Password changed!");
    } else {
      const result = await res.json();
      setError(result.error || "Fail to change password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-md max-w-md">
      {fields.map((field) => (
        <PasswordInput
          key={field.key}
          name={field.key}
          label={field.label}
          value={
            field.key === "current"
              ? currentPassword
              : field.key === "new"
              ? newPassword
              : confirmPassword
          }
          onChange={(val: string) => {
            if (field.key === "current") setCurrentPassword(val);
            if (field.key === "new") setNewPassword(val);
            if (field.key === "confirm") setConfirmPassword(val);
          }}
          show={show[field.key]}
          toggleShow={() =>
            setShow((prev) => ({ ...prev, [field.key]: !prev[field.key] }))
          }
        />
      ))}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={!isValid}
        className={`bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition ${
          !isValid ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Cập nhật mật khẩu mới
      </button>
    </form>
  );
};

export default ChangePasswordForm;
