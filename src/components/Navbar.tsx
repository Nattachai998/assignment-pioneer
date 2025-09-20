"use client";

import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="text-white">
      <h1 className="text-3xl font-bold mt-10">
        ตัวอย่างหน้าจอระบบสั่งซื้อสินค้า (Web Application)
      </h1>
      <ul className="flex gap-6 justify-start items-center pl-0 p-2 mt-6 text-md font-semibold">
        <li>
          <Link
            href="/home/master-product"
            className="px-6 py-2 rounded-xl text-white bg-blue-500 hover:bg-blue-600 transition"
          >
            สินค้า
          </Link>
        </li>
        <li>
          <Link
            href="/home/master-users"
            className="px-6 py-2 rounded-xl text-white bg-green-500 hover:bg-green-600 transition"
          >
            ลูกค้า
          </Link>
        </li>
        <li>
          <Link
            href="/home/master-sales"
            className="px-6 py-2 rounded-xl text-white bg-purple-500 hover:bg-purple-600 greentransition"
          >
            คำสั่งขาย
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
