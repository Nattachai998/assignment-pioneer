"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/lib/type";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function ProductPage() {
  const router = useRouter();
  const Swal = require("sweetalert2");

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState<Product>({
    product_id: "",
    product_code: "",
    product_name: "",
    unit_code: "",
    price: 0,
  });

  function onShow() {
    setEditId(null)
    setShowForm(true)
    setForm({
      product_id: "",
      product_code: "",
      product_name: "",
      unit_code: "",
      price: 0,
    })
  }

  const onEdit = async (row: any) => {
    setEditId(row.product_id)
    setShowForm(true);
    setForm({
      product_id: row.product_id,
      product_code: row.product_code,
      product_name: row.product_name,
      unit_code: row.unit_code,
      price: Number(row.price),
    });
  };

  const onFetch = async () => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "fetchProduct", payload: {} }),
    });

    if (!res.ok) throw new Error("Data Error");
    const json = await res.json();
    const mapitem = json.data.map((p: any) => ({
      product_id: p.product_id,
      product_code: p.product_code,
      product_name: p.product_name,
      unit_code: p.unit_code,
      price: Number(p.price),
    }));
    setItems(mapitem);
  };

  const onSave = async () => {
    if (!form.product_code || !form.product_name || !form.unit_code || !form.price) {
      Swal.fire("Error", "กรอกข้อมูลให้ครบถ้วน", "error");
      return;
    }

    const isEdit = Boolean(editId);
    const type = isEdit ? "updateProduct" : "createProduct"; 
    const payload = isEdit ? { ...form, product_id: editId } : form;

    Swal.fire({
      icon: "question",
      title: isEdit ? "Do you want to Update Data?" : "Do you want to Save Data?",
      text: "Please verify the information before saving.",
      showDenyButton: true,
      confirmButtonText: "Save",
    }).then((result: any) => {
      if (result.isConfirmed) {
        fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, payload }),
        })
          .then((resData) => {
            if (!resData.ok) throw new Error("Data Error");

            Swal.fire("Saved!", "", "success").then(() => {
              setShowForm(false);
              setEditId(null);
              onFetch();
            });
            
            return resData.json();
          })
          .catch((error) => {
            Swal.fire(
              {
                icon: "error",
                title: "Something went wrong!",
                text: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
              },
              error
            );
          });
      }
    });
  };

  const onDelete = async (row: any) => {
    Swal.fire({
      icon: "warning",
      title: `ลบสินค้า ${row.product_code}?`,
      showCancelButton: true,
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    }).then(async (result: any) => {
      if (!result.isConfirmed) return;

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "deleteProduct",
          payload: { product_id: row.product_id },
        }),
      });

      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "ลบไม่สำเร็จ",
          text: "Delete failed",
        });
      }

      Swal.fire("Deleted!", "", "success").then(onFetch);
    });
  };

  useEffect(() => {
    onFetch();
  }, []);

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold">จัดการข้อมูลสินค้า</h2>
        <button
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition"
          onClick={onShow}
        >
          + เพิ่มสินค้า
        </button>
      </div>

      {/* table */}
      <div className="mt-6 grid gap-6 transition-all">
        <div className="bg-gray-900/40 rounded-lg border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-white/5 text-left text-gray-200">
                <tr>
                  <th className="px-4 py-3">รหัสสินค้า</th>
                  <th className="px-4 py-3">รหัสอ้างอิง</th>
                  <th className="px-4 py-3">หน่วย</th>
                  <th className="px-4 py-3 text-right">ราคา</th>
                  <th className="px-4 py-3 text-right flex justify-center">
                    การจัดการ
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {items.map((p) => (
                  <tr key={p.product_id} className="hover:bg-white/5">
                    <td className="px-4 py-3 font-medium text-white/90">
                      {p.product_code}
                    </td>
                    <td className="px-4 py-3">{p.product_name}</td>
                    <td className="px-4 py-3">{p.unit_code}</td>
                    <td className="px-4 py-3 text-right">
                      {p.price.toLocaleString() + "฿"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-4">
                        <button
                          className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-600 text-white"
                          onClick={() => onEdit(p)}
                        >
                          แก้ไข
                        </button>
                        <button
                          className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
                          onClick={() => onDelete(p)}
                        >
                          ลบ
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td
                      className="px-4 py-6 text-center text-white/60"
                      colSpan={5}
                    >
                      ยังไม่มีรายการสินค้า
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* dialog */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="flex justify-center text-lg font-bold mb-4 text-white">
              เพิ่มรายการสินค้า
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  {" "}
                  รหัสอ้างอิง{" "}
                </label>
                <input
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none"
                  type="text"
                  value={form.product_code}
                  onChange={(e) =>
                    setForm({ ...form, product_code: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  {" "}
                  ชื่อสินค้า{" "}
                </label>
                <input
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none"
                  type="text"
                  value={form.product_name}
                  onChange={(e) =>
                    setForm({ ...form, product_name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  {" "}
                  หน่วย{" "}
                </label>
                <input
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none"
                  type="text"
                  value={form.unit_code}
                  onChange={(e) =>
                    setForm({ ...form, unit_code: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  {" "}
                  ราคา{" "}
                </label>
                <input
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none"
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: Number(e.target.value) })
                  }
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 transition border-0"
                onClick={onSave}
              >
                บันทึก
              </button>
              <button
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white"
                onClick={() => setShowForm(false)}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
