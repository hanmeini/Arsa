"use client";

import { ChevronDown, TrendingUp } from "lucide-react";
import Image from "next/image";

export function TrendChart() {
  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 h-full">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-orange-500" />
          <h3 className="font-bold text-gray-900 text-lg">Trend Desain</h3>
        </div>
        <button className="flex items-center gap-1 px-3 py-1 rounded-full border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50">
          Januari <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      <div className="flex justify-between items-end mb-4">
        <p className="text-xs text-gray-400 max-w-[120px]">
          Mengikuti perubahan kebutuhan dan selera desain
        </p>
        <span className="font-bold text-gray-900 text-sm">2026</span>
      </div>

      <div className="flex gap-2 h-44 w-full">
        {/* Y-Axis Labels */}
        <div className="flex flex-col justify-between text-[8px] text-gray-900 font-bold text-right py-2">
          <span>100rb</span>
          <span>50rb</span>
          <span>40rb</span>
          <span>30rb</span>
          <span>20rb</span>
          <span>10rb</span>
          <span>5rb</span>
          <span>0</span>
        </div>

        {/* Chart Area */}
        <div className="flex-1 relative">
          {/* Dashed Grid Lines */}
          <div className="absolute top-[0%] w-full border-t border-dashed border-gray-100"></div>
          <div className="absolute top-[14%] w-full border-t border-dashed border-gray-100"></div>
          <div className="absolute top-[42%] w-full border-t border-dashed border-gray-100"></div>
          <div className="absolute top-[71%] w-full border-t border-dashed border-gray-100"></div>
          <div className="absolute bottom-0 w-full border-t border-gray-200"></div>

          {/* SVG Chart */}
          <div className="absolute inset-0 pt-2">
            <Image
              src="/icons/chart-hero.svg"
              alt="Trend Chart"
              width={300}
              height={200}
              className="w-full h-full object-contain object-bottom"
            />
          </div>

          {/* X- Axis Labels */}
          <div className="absolute -bottom-6 left-0 w-full flex justify-between px-4 text-[8px] text-gray-400">
            <span>Minimalism</span>
            <span>Minimalism</span>
          </div>
        </div>
      </div>
    </div>
  );
}
