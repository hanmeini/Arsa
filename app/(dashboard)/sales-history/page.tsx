"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Mock Data ---
const transactions = [
  {
    id: "TRX-9821",
    customer: "Budi Santoso",
    date: "19 Jan 2026, 10:30",
    amount: 150000,
    items: "Kopi Arabika (2), Snack (3)",
    status: "Success",
    payment: "QRIS",
  },
  {
    id: "TRX-9820",
    customer: "Siti Aminah",
    date: "19 Jan 2026, 09:15",
    amount: 325000,
    items: "Paket Sembako A",
    status: "Pending",
    payment: "Transfer Bank",
  },
  {
    id: "TRX-9819",
    customer: "Rudi Hermawan",
    date: "18 Jan 2026, 18:45",
    amount: 45000,
    items: "Pulsa 50rb",
    status: "Success",
    payment: "Cash",
  },
  {
    id: "TRX-9818",
    customer: "Dewi Lestari",
    date: "18 Jan 2026, 14:20",
    amount: 890000,
    items: "Kemeja Batik Pria (2)",
    status: "Failed",
    payment: "E-Wallet",
  },
  {
    id: "TRX-9817",
    customer: "Andi Wijaya",
    date: "18 Jan 2026, 11:10",
    amount: 120000,
    items: "Madu Hutan Asli",
    status: "Success",
    payment: "QRIS",
  },
  {
    id: "TRX-9816",
    customer: "Maya Putri",
    date: "17 Jan 2026, 16:00",
    amount: 250000,
    items: "Skin Care Set",
    status: "Success",
    payment: "Transfer Bank",
  },
  {
    id: "TRX-9815",
    customer: "Eko Prasetyo",
    date: "17 Jan 2026, 09:30",
    amount: 65000,
    items: "Token Listrik",
    status: "Success",
    payment: "Cash",
  },
];

export default function SalesHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredTransactions = transactions.filter((trx) => {
    const matchesSearch =
      trx.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trx.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || trx.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Success":
        return "text-green-700 bg-green-50 border-green-100";
      case "Pending":
        return "text-amber-700 bg-amber-50 border-amber-100";
      case "Failed":
        return "text-red-700 bg-red-50 border-red-100";
      default:
        return "text-gray-700 bg-gray-50 border-gray-100";
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F4C75] tracking-tight">
            Riwayat Penjualan
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Daftar transaksi yang telah berlangsung
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari ID Transaksi atau Nama Pelanggan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#0F4C75] focus:ring-2 focus:ring-[#0F4C75]/20 outline-none transition-all text-sm"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
          {["All", "Success", "Pending", "Failed"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                statusFilter === status
                  ? "bg-[#0F4C75] text-white shadow-md shadow-blue-900/20"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100",
              )}
            >
              {status === "All" ? "Semua" : status}
            </button>
          ))}
          <button className="px-3 py-2 rounded-xl border border-dashed border-gray-300 text-gray-500 hover:border-[#0F4C75] hover:text-[#0F4C75] transition-all">
            <Calendar className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#f8f9fa] border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-bold text-gray-700">
                  ID Transaksi
                </th>
                <th className="px-6 py-4 font-bold text-gray-700">Waktu</th>
                <th className="px-6 py-4 font-bold text-gray-700">Pelanggan</th>
                <th className="px-6 py-4 font-bold text-gray-700">Item</th>
                <th className="px-6 py-4 font-bold text-gray-700">Total</th>
                <th className="px-6 py-4 font-bold text-gray-700">
                  Pembayaran
                </th>
                <th className="px-6 py-4 font-bold text-gray-700">Status</th>
                <th className="px-6 py-4 font-bold text-gray-700 text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTransactions.map((trx) => (
                <tr
                  key={trx.id}
                  className="hover:bg-blue-50/30 transition-colors group"
                >
                  <td className="px-6 py-4 font-medium text-[#0F4C75]">
                    {trx.id}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{trx.date}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {trx.customer}
                    </div>
                  </td>
                  <td
                    className="px-6 py-4 text-gray-500 max-w-[200px] truncate"
                    title={trx.items}
                  >
                    {trx.items}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    Rp {trx.amount.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{trx.payment}</td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border",
                        getStatusColor(trx.status),
                      )}
                    >
                      {trx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-[#0F4C75] hover:bg-blue-50 rounded-lg transition-all">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-500">
                    Tidak ada transaksi yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Dummy */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <span className="text-sm text-gray-500">
            Menampilkan <span className="font-medium">1-7</span> dari{" "}
            <span className="font-medium">128</span> data
          </span>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
