"use client";

import React, { useEffect, useState } from "react";
import { SaleOrder } from "@/lib/type";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import { OwnerSelected, ProductSelected } from "@/components/Dropwons";

export default function UsersPage() {
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  
  const [form, setForm] = useState<SaleOrder>({
    docutment_id: "",
    docutment_no: "",
    document_date: "",
    owner_id: "",
    owner_code: "",
    owner_name: "",
    address: "",
    phone: "",
    product_id: "",
    product_code: "",
    product_name: "",
    qty: 0,
    price: 0,
    total: 0, // qty * price
  });

  function onShow() {
    setShowForm(true);
    setForm({
      docutment_id: "",
      docutment_no: "",
      document_date: "",
      owner_id: "",
      owner_code: "",
      owner_name: "",
      address: "",
      phone: "",
      product_id: "",
      product_code: "",
      product_name: "",
      qty: 0,
      price: 0,
      total: 0, // qty * price
    });
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold">จัดการข้อมูลลูกค้า</h2>
        <button
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition"
          onClick={onShow}
        >
          + เพิ่มใบสั่งขาย
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
                  <th className="px-4 py-3 text-center">การจัดการ</th>
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
                    <td className="px-4 py-3 text-right">{p.phone}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-4">
                        <button
                          className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-600 text-white"
                          // onClick={() => onEdit(p)}
                        >
                          แก้ไข
                        </button>
                        <button
                          className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
                          // onClick={() => onDelete(p)}
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
                      ยังไม่มีรายการลูกค้า
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
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-white">
              สร้างคำสั่งขาย
            </h3>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  เลขที่เอกสาร
                </label>
                <input
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none"
                  type="text"
                  value={form.docutment_no}
                  onChange={(e) =>
                    setForm({ ...form, docutment_no: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  วันที่เอกสาร
                </label>
                <input
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none"
                  type="date"
                  value={form.document_date}
                  onChange={(e) =>
                    setForm({ ...form, document_date: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  ลูกค้า
                </label>
                <OwnerSelected
                  val={form.owner_id}
                  chage={(o: any) => {
                    {
                      console.log("value", o);
                      setForm({
                        ...form,
                        owner_id: o.owner_id,
                        owner_code: o.owner_code,
                        owner_name: o.owner_name,
                      });
                    }
                  }}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-300 mb-1">
                  ที่อยู่ลูกค้า
                </label>
                <textarea
                  rows={2}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none resize-none"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  เบอร์โทรติดต่อ
                </label>
                <input
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-between">
              <h3 className="text-lg font-bold mb-4 text-white mt-4">
                รายการสินค้า
              </h3>
              <button
                className="mt-4 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition"
                onClick={() =>
                  setRows([
                    ...rows,
                    { id: Date.now(), product: "", qty: 0, price: 0 },
                  ])
                }
              >
                + เพิ่มรายการ
              </button>
            </div>

            {/* table */}
            <table className="min-w-full text-sm mt-6 bg-gray-900/40 border border-white/10 rounded-lg">
              <thead className="bg-white/5 text-gray-200">
                <tr>
                  <th className="px-4 py-3">สินค้า</th>
                  <th className="px-4 py-3">จำนวน</th>
                  <th className="px-4 py-3">ราคา/หน่วย</th>
                  <th className="px-4 py-3 text-right">ยอดเงิน</th>
                  <th className="px-4 py-3 text-center">การจัดการ</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-6 text-center text-white/60"
                    >
                      ยังไม่มีรายการ
                    </td>
                  </tr>
                )}

                {rows.map((r, index) => (
                  <tr key={r.id}>
                    <td className="px-4 py-2">
                      <ProductSelected
                        val={form.product_id}
                        chage={(o: any) => {
                          {
                            console.log("value", o);
                            setForm({
                              ...form,
                              product_id: o.product_id,
                              product_code: o.product_code,
                              product_name: o.product_name,
                            });
                          }
                        }}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        className="w-full px-2 py-1 rounded bg-gray-700 text-white text-right"
                        type="number"
                        value={r.qty}
                        onChange={(e) => {
                          const copy = [...rows];
                          copy[index].qty = Number(e.target.value);
                          setRows(copy);
                        }}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        className="w-full px-2 py-1 rounded bg-gray-700 text-white text-right"
                        type="number"
                        value={r.price}
                        onChange={(e) => {
                          const copy = [...rows];
                          copy[index].price = Number(e.target.value);
                          setRows(copy);
                        }}
                      />
                    </td>
                    <td className="px-4 py-2 text-right">{r.qty * r.price}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => {
                          const copy = [...rows];
                          copy.splice(index, 1);
                          setRows(copy);
                        }}
                        className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ปุ่ม */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white transition border-0"
                // onClick={onSave}
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
