import { auth } from "@/auth";
import Header from "@/components/shared/Header";
import React from "react";
import ChangePasswordForm from "@/components/form/ChangePasswordForm";
import ChangeLoginInfoForm from "@/components/form/ChangeLoginInfoForm";
import ChangeProfileForm from "@/components/form/ChangeProfileForm";
import SettingSection from "@/components/shared/SettingSection";

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

      <SettingSection title="Change Password">
        <ChangePasswordForm />
      </SettingSection>

      <hr className="my-4 border-gray-300 w-full" />

      <SettingSection title="Change Login Information">
        <ChangeLoginInfoForm />
      </SettingSection>

      <hr className="my-4 border-gray-300 w-full" />

      <SettingSection title="Change Profile">
        <ChangeProfileForm />
      </SettingSection>
    </main>
  );
}
