"use client";

import React, { useEffect, useState } from "react";
import { Owner } from "@/lib/type";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { User } from "@supabase/supabase-js";

export default function ProductPage() {
  const router = useRouter();
  const Swal = require("sweetalert2");

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState<Owner>({
    owner_id: "",
    owner_code: "",
    owner_name: "",
    address: "",
    phone: "",
  });

  function onShow() {
    setEditId(null)
    setShowForm(true)
    setForm({
      owner_id: "",
      owner_code: "",
      owner_name: "",
      address: "",
      phone: "",
    })
  }

  const onEdit = async (row: any) => {
    setEditId(row.owner_id)
    setShowForm(true);
    setForm({
      owner_id: row.owner_id,
      owner_code: row.owner_code,
      owner_name: row.owner_name,
      address: row.address,
      phone: row.phone,
    });
  };

  const onFetch = async () => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "fetchUser", payload: {} }),
    });

    if (!res.ok) throw new Error("Data Error");
    const json = await res.json();
    const mapitem = (json.data || []).map((o: any) => ({
      owner_id: o.owner_id,
      owner_code: o.owner_code,
      owner_name: o.owner_name,
      address: o.address,
      phone: o.phone,
    }));
    setItems(mapitem);
  };

  const onSave = async () => {
    if (!form.owner_code || !form.owner_name || !form.address || !form.phone) {
      Swal.fire("Error", "กรอกข้อมูลให้ครบถ้วน", "error");
      return;
    }

    const isEdit = Boolean(editId);
    const type = isEdit ? "updateUser" : "createUser"; 
    const payload = isEdit ? { ...form, owner_id: editId } : form;

    Swal.fire({
      icon: "question",
      title: isEdit ? "Do you want to Update Data?" : "Do you want to Save Data?",
      text: "Please verify the information before saving.",
      showDenyButton: true,
      confirmButtonText: "Save",
    }).then((result: any) => {
      if (result.isConfirmed) {
        fetch("/api/users", {
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
      title: `ลบสินค้า ${row.owner_code}?`,
      showCancelButton: true,
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    }).then(async (result: any) => {
      if (!result.isConfirmed) return;

      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "deleteUser",
          payload: { owner_id: row.owner_id },
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
        <h2 className="text-xl font-bold">จัดการข้อมูลลูกค้า</h2>
        <button
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition"
          onClick={onShow}
        >
          + เพิ่มลูกค้า
        </button>
      </div>

      {/* table */}
      <div className="mt-6 grid gap-6 transition-all">
        <div className="bg-gray-900/40 rounded-lg border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-white/5 text-left text-gray-200">
                <tr>
                  <th className="px-4 py-3">รหัสลูกค้า</th>
                  <th className="px-4 py-3">ชื่อลูกค้า</th>
                  <th className="px-4 py-3">ที่อยู่ลูกค้า</th>
                  <th className="px-4 py-3 text-right">เบอร์โทรติดต่อ</th>
                  <th className="px-4 py-3 text-right flex justify-center">
                    การจัดการ
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {items.map((p) => (
                  <tr key={p.owner_id} className="hover:bg-white/5">
                    <td className="px-4 py-3 font-medium text-white/90">
                      {p.owner_code}
                    </td>
                    <td className="px-4 py-3">{p.owner_name}</td>
                    <td className="px-4 py-3">{p.address}</td>
                    <td className="px-4 py-3 text-right">
                      {p.phone}
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
              เพิ่มรายการลูกค้า
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1"> รหัสลูกค้า </label>
                <input
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none"
                  type="text"
                  value={form.owner_code}
                  onChange={(e) =>
                    setForm({ ...form, owner_code: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1"> ชื่อลูกค้า </label>
                <input
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none"
                  type="text"
                  value={form.owner_name}
                  onChange={(e) =>
                    setForm({ ...form, owner_name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1"> ที่อยู่ลูกค้า </label>
                <input
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none"
                  type="text"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1"> เบอร์โทรติดต่อ </label>
                <input
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none"
                  type="number"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
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
