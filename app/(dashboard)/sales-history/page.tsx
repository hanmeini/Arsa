"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Eye,
  Upload,
  Database, // Icon for demo data
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ImportTransactionModal } from "@/components/features/sales/ImportTransactionModal";
import { useAuth } from "@/context/AuthContext";
import { Transaction, subscribeToTransactions } from "@/lib/firebase/sales";
import { generateDemoData } from "@/lib/demo-data";

export default function SalesHistoryPage() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [generatingDemo, setGeneratingDemo] = useState(false);

  useEffect(() => {
    if (user) {
      const unsubscribe = subscribeToTransactions(user.uid, (data) => {
        setTransactions(data);
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleGenerateDemo = async () => {
    if (!user) return;
    if (
      !window.confirm(
        "Ini akan menambahkan data dummy ke akun Anda. Lanjutkan?",
      )
    )
      return;

    setGeneratingDemo(true);
    try {
      await generateDemoData(user.uid);
      alert("Data dummy berhasil ditambahkan!");
    } catch (e) {
      console.error(e);
      alert("Gagal menambahkan data.");
    } finally {
      setGeneratingDemo(false);
    }
  };

  const filteredTransactions = transactions.filter((trx) => {
    const searchLower = searchQuery.toLowerCase();
    const customerMatch = trx.customerName
      ? trx.customerName.toLowerCase().includes(searchLower)
      : false;
    const idMatch = trx.id ? trx.id.toLowerCase().includes(searchLower) : false;
    const matchesSearch = customerMatch || idMatch;

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

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "-";
    // Handle Firestore Timestamp
    if (timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return new Date(timestamp).toLocaleString();
  };

  const handleImport = (data: any[]) => {
    // In real app, this would merge data
    console.log("Imported data:", data);
    // For now just close, as we mocked the success state in modal
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
          {/* Import Button */}
          <button
            onClick={() => setIsImportOpen(true)}
            className="bg-[#0F4C75] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#0F4C75]/90 transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20"
          >
            <Upload className="w-4 h-4" />
            Import Data
          </button>

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

              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400 mx-auto" />
                  </td>
                </tr>
              ) : filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-500">
                    Tidak ada transaksi yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((trx) => (
                  <tr
                    key={trx.id}
                    className="hover:bg-blue-50/30 transition-colors group"
                  >
                    <td className="px-6 py-4 font-medium text-[#0F4C75] text-xs">
                      {trx.id?.substring(0, 8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {formatDate(trx.date)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {trx.customerName || "Customer Umum"}
                      </div>
                      <div className="text-xs text-gray-400">{trx.source}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 max-w-[200px] truncate">
                      {trx.items?.length || 1} Item
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">
                      Rp {trx.totalAmount.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {trx.paymentMethod}
                    </td>
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

                  </tr>
                ))
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

      <ImportTransactionModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImport={handleImport}
      />
    </div>
  );
}
