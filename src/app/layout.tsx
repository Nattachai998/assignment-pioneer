import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "ระบบสั่งซื้อสินค้า",
  description: "Web Application ตัวอย่าง",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="min-h-screen bg-gray-900 text-white">
        {/* Navbar อยู่ตรงนี้ก็ได้ */}
        <div className="flex flex-col items-center">
          <div className="mt-6">
            <Navbar />
          </div>

          <div className="mt-8 w-full max-w-3xl px-6">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
