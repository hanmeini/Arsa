"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { DollarSign, TrendingUp, ShoppingCart, Package } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Mock Data ---
const performanceData = [
  { name: "Jan", sales: 42000, revenue: 60000 },
  { name: "Feb", sales: 50000, revenue: 70000 },
  { name: "Mar", sales: 45000, revenue: 58000 },
  { name: "Apr", sales: 60000, revenue: 80000 },
  { name: "Mei", sales: 55000, revenue: 72000 },
  { name: "Jun", sales: 75000, revenue: 90000 },
  { name: "Jul", sales: 82000, revenue: 98000 },
  { name: "Agu", sales: 75000, revenue: 92000 },
  { name: "Sep", sales: 83000, revenue: 98000 },
  { name: "Okt", sales: 90000, revenue: 108000 },
  { name: "Nov", sales: 100000, revenue: 118000 },
  { name: "Des", sales: 120000, revenue: 135000 },
];

const categoryData = [
  { name: "Makanan", value: 12500000, color: "#0F4C75" },
  { name: "Minuman", value: 8500000, color: "#3282B8" },
  { name: "Pakaian", value: 6200000, color: "#BBE1FA" },
  { name: "Elektronik", value: 4500000, color: "#FF9600" },
  { name: "Lainnya", value: 3000000, color: "#FFB74D" },
];

const kpiStats = [
  {
    title: "Total Penjualan",
    value: "1.248",
    subtext: "(transaksi berhasil)",
    icon: DollarSign,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    change: "+12.5%",
    trend: "up",
  },
  {
    title: "Total Pesanan",
    value: "1.312",
    subtext: null,
    icon: TrendingUp,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    change: "+12.5%",
    trend: "up",
  },
  {
    title: "Total Revenue",
    value: "Rp 187.450.000",
    subtext: null,
    icon: ShoppingCart,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    change: "+12.5%",
    trend: "up",
  },
  {
    title: "Tingkat Pertumbuhan",
    value: "+12,6%",
    subtext: null,
    icon: Package,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    change: "+12.5%",
    trend: "up",
  },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0F4C75] tracking-tight">
          Laporan Performa
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Overview of your e-commerce performance metrics
        </p>
        <div className="border-b border-gray-200 mt-4" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  stat.bgColor,
                )}
              >
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-400 mb-1">
                {stat.title}
              </p>
              <h3 className="text-2xl font-bold text-gray-900 leading-none">
                {stat.value}
              </h3>
              {stat.subtext && (
                <p className="text-xs text-blue-500 font-medium mt-1 italic">
                  {stat.subtext}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Dual Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CHART 1: Sales Trends (Line Chart) */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#0F4C75]">Tren Penjualan</h2>
            <p className="text-sm text-gray-400">
              Performa penjualan vs pendapatan tahun ini
            </p>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={performanceData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  tickMargin={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  name="Penjualan"
                  stroke="#3282B8"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: "#3282B8",
                    strokeWidth: 2,
                    stroke: "#fff",
                  }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  name="Pendapatan"
                  stroke="#6366F1"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: "#6366F1",
                    strokeWidth: 2,
                    stroke: "#fff",
                  }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Legend Chart 1 */}
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#3282B8]" />
              <span className="text-xs font-medium text-gray-500">
                Penjualan
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#6366F1]" />
              <span className="text-xs font-medium text-gray-500">
                Pendapatan
              </span>
            </div>
          </div>
        </div>

        {/* CHART 2: Revenue by Category (Bar Chart) */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#0F4C75]">
              Pendapatan per Kategori
            </h2>
            <p className="text-sm text-gray-400">
              Kontribusi pendapatan dari setiap kategori
            </p>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  tickMargin={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: "#F3F4F6" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  formatter={(value: number) => [
                    `Rp ${value.toLocaleString("id-ID")}`,
                    "Pendapatan",
                  ]}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend Chart 2 - Optional, categories are clear from x-axis */}
          <div className="flex justify-center mt-4">
            <span className="text-xs text-gray-400 italic">
              Data diperbarui 1 jam yang lalu
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
