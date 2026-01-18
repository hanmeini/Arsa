"use client";

import { ShoppingBag, TrendingUp, ShoppingCart, FileText } from "lucide-react";
import Image from "next/image";

export function StatsCards({ stats }: { stats?: any }) {
  // Parsing helpers or fallback
  const salesValue = stats?.sales || "156";
  const ordersValue = stats?.orders || "18";
  const viewsValue = stats?.views || "1.245";
  const trendPct = stats?.trend || 12;

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm h-full border border-gray-100 flex flex-col min-h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-xl text-gray-900">Ringkasan Hari Ini</h3>
        <div className="w-8 h-8 rounded-full bg-[#0F4C75] flex items-center justify-center cursor-pointer hover:bg-[#0a3554] transition-colors shadow-md shadow-blue-200">
          <Image
            src="/icons/jam_task-list-f.svg"
            alt="jam"
            width={20}
            height={20}
            className="w-4 h-4 text-white"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        {/* Sales */}
        <div className="flex items-center gap-5 py-2">
          <div className="w-14 h-14 rounded-2xl bg-sky-100/80 flex items-center justify-center text-[#0F4C75]">
            <Image
              src="/icons/Subtract.svg"
              width={20}
              height={20}
              alt="penjualan"
              className="w-7 h-7"
            />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900 text-lg">Penjualan</p>
            <p className="text-sm font-bold text-[#0F4C75] flex items-center gap-1">
              ▲{" "}
              <span className="text-gray-500 font-medium">
                {trendPct}% dari kemarin
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-gray-900 text-lg">
              Rp. {viewsValue}.000
            </p>
            <p className="text-sm text-[#0F4C75] font-bold">
              +{trendPct}%{" "}
              <span className="text-gray-400 font-normal">dari kemarin</span>
            </p>
          </div>
        </div>

        {/* Orders */}
        <div className="flex items-center gap-5 py-2 border-t border-gray-200 pt-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-100/80 flex items-center justify-center text-orange-500">
            <Image
              src="/icons/mdi_cart.svg"
              width={20}
              height={20}
              alt="penjualan"
              className="w-7 h-7"
            />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900 text-lg">Penjualan</p>
            <p className="text-sm font-bold text-orange-500 flex items-center gap-1">
              ▼{" "}
              <span className="text-gray-500 font-medium">2% dari kemarin</span>
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-gray-900 text-lg">
              {ordersValue} Pesanan
            </p>
            <p className="text-sm text-orange-500 font-bold">
              5 <span className="text-gray-400 font-normal">Pesanan baru</span>
            </p>
          </div>
        </div>

        {/* Trend */}
        <div className="flex items-center gap-5 py-2 border-t border-gray-200 pt-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
            <Image
              src="/icons/Frame 53.svg"
              width={20}
              height={20}
              alt="penjualan"
              className="w-7 h-7"
            />
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
