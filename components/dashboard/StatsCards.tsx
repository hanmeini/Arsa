"use client";

import { ShoppingBag, TrendingUp, ShoppingCart, FileText } from "lucide-react";

export function StatsCards() {
  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm h-full border border-gray-100 flex flex-col min-h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-xl text-gray-900">Ringkasan Hari Ini</h3>
        <div className="w-8 h-8 rounded-full bg-[#0F4C75] flex items-center justify-center cursor-pointer hover:bg-[#0a3554] transition-colors shadow-md shadow-blue-200">
          <FileText className="w-4 h-4 text-white" />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        {/* Sales */}
        <div className="flex items-center gap-5 py-2">
          <div className="w-14 h-14 rounded-2xl bg-sky-100/80 flex items-center justify-center text-[#0F4C75]">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900 text-lg">Penjualan</p>
            <p className="text-sm font-bold text-[#0F4C75] flex items-center gap-1">
              ▲{" "}
              <span className="text-gray-500 font-medium">
                12% dari kemarin
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-gray-900 text-lg">Rp. 2.450.000</p>
            <p className="text-sm text-[#0F4C75] font-bold">
              +12%{" "}
              <span className="text-gray-400 font-normal">dari kemarin</span>
            </p>
          </div>
        </div>

        {/* Orders */}
        <div className="flex items-center gap-5 py-2 border-t border-gray-100 pt-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-100/80 flex items-center justify-center text-orange-500">
            <ShoppingCart className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900 text-lg">Penjualan</p>
            <p className="text-sm font-bold text-orange-500 flex items-center gap-1">
              ▼{" "}
              <span className="text-gray-500 font-medium">2% dari kemarin</span>
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-gray-900 text-lg">18 Pesanan</p>
            <p className="text-sm text-orange-500 font-bold">
              5 <span className="text-gray-400 font-normal">Pesanan baru</span>
            </p>
          </div>
        </div>

        {/* Trend */}
        <div className="flex items-center gap-5 py-2 border-t border-gray-100 pt-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900 text-lg">Trend Hari ini</p>
            <p className="text-sm font-medium text-amber-500">
              Minuman segar & Healthy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
