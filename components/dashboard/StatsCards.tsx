"use client";

import { ShoppingBag, TrendingUp, ShoppingCart, Info } from "lucide-react";

export function StatsCards() {
  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-gray-900">Ringkasan Hari Ini</h3>
        <div className="w-6 h-6 rounded-full bg-[#0F4C75] flex items-center justify-center cursor-pointer">
          <Info className="w-3 h-3 text-white" />
        </div>
      </div>

      <div className="space-y-6">
        {/* Sales */}
        <div className="flex items-center gap-4 py-2">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-[#0F4C75]">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900 text-base">Penjualan</p>
            <p className="text-xs font-bold text-[#0F4C75]">
              ▲{" "}
              <span className="text-gray-500 font-medium">
                12% dari kemarin
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-gray-900">Rp. 2.450.000</p>
            <p className="text-xs text-sky-500 font-bold">
              +12%{" "}
              <span className="text-gray-400 font-normal">dari kemarin</span>
            </p>
          </div>
        </div>

        {/* Orders */}
        <div className="flex items-center gap-4 py-2 border-t border-gray-50 pt-6">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900 text-base">Penjualan</p>
            <p className="text-xs font-bold text-orange-500">
              ▼{" "}
              <span className="text-gray-500 font-medium">2% dari kemarin</span>
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-gray-900">18 Pesanan</p>
            <p className="text-xs text-orange-500 font-bold">
              5 <span className="text-gray-400 font-normal">Pesanan baru</span>
            </p>
          </div>
        </div>

        {/* Trend */}
        <div className="flex items-center gap-4 py-2 border-t border-gray-50 pt-6">
          <div className="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center text-yellow-500">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900 text-base">Trend Hari ini</p>
            <p className="text-xs font-medium text-orange-500">
              Minuman segar & Healthy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
