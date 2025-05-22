import { auth } from "@/auth";
import ChangePasswordForm from "@/components/form/ChangePasswordForm";
import ChangeLoginInfoForm from "@/components/form/ChangeLoginInfoForm";
import Header from "@/components/shared/Header";
import React from "react";
import ChangeProfileForm from "@/components/form/ChangeProfileForm";

export default async function Page() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return (
      <p className="p-4 text-red-500">Bạn cần đăng nhập để xem danh mục.</p>
    );
  }

  return (
    <main className="m-4 flex-1 flex flex-col gap-2 border border-gray-200 p-4 rounded-2xl">
      <Header title="Setting" description="Let's update your account" />

      {/* Change Password */}
      <div className="flex flex-col px-12 py-3 gap-6 w-full items-start">
        <h3 className="text-lg font-semibold">Change Password</h3>
        <div className="flex items-center justify-center w-full">
          <ChangePasswordForm />
        </div>
      </div>

      <hr className="my-4 border-gray-300 w-full" />

      {/* Change Login Info */}
      <div className="flex flex-col px-12 py-3 gap-6 w-full items-start">
        <h3 className="text-lg font-semibold">Change Login Information</h3>
        <div className="flex items-center justify-center w-full">
          <ChangeLoginInfoForm />
        </div>
      </div>

      <hr className="my-4 border-gray-300 w-full" />

      {/* Change Profile */}
      <div className="flex flex-col px-12 py-3 gap-6 w-full items-start">
        <h3 className="text-lg font-semibold">Change Profile</h3>
        <div className="flex items-center justify-center w-full">
          <ChangeProfileForm />
        </div>
      </div>
    </main>
  );
}
