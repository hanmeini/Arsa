import { PredictiveChart } from "@/components/features/dashboard/PredictiveChart";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics",
  description: "Market trends and sales predictions",
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900">Predictive Demand</h1>
        <p className="text-gray-500">
          Forecast market trends and optimize your inventory.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">
            Sales Forecast (Next 7 Days)
          </h3>
          <div className="h-80 w-full">
            <PredictiveChart />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Market Trend Analysis</h3>
          <div className="h-80 w-full flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-400">Weather & Seasonal Data Integrated</p>
          </div>
        </div>
      </div>
    </div>
  );
}
