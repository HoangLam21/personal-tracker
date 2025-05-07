import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-4xl font-bold text-indigo-600 mb-4">404</h1>
      <h2 className="text-xl text-black font-semibold mb-2">
        Không tìm thấy trang
      </h2>
      <p className="text-gray-500 mb-6">
        Trang bạn đang tìm kiếm có thể đã bị xóa hoặc không tồn tại.
      </p>
      <Link
        href="/"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500 transition"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
