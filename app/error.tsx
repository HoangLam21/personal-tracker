"use client";

import { useEffect } from "react";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Lỗi hệ thống:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <div className="max-w-md">
        <h1 className="text-4xl font-extrabold text-indigo-600 mb-4">
          Có lỗi xảy ra
        </h1>
        <p className="text-gray-700 mb-6">
          Xin lỗi, chúng tôi gặp sự cố khi tải trang. Vui lòng thử lại hoặc quay
          lại sau.
        </p>
        <button
          onClick={() => reset()}
          className="inline-block px-5 py-2 text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium transition-colors"
        >
          Thử lại
        </button>
      </div>
    </main>
  );
}
