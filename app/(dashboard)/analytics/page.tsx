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

import { SectionContainer } from "@/components/dashboard/SectionContainer";

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
    <SectionContainer>
      <div className="space-y-8 pb-10">
        {/* Header with improved typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              Analytics
            </h1>
            <p className="text-lg text-gray-500 mt-2 font-light">
              Deep dive into your business metrics.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-100">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live Data • Updated just now
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
          {/* Main KPI Card - Spans 2 cols, 2 rows */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bg-gradient-to-br from-[#0F4C75] to-[#1B5F8C] rounded-[2rem] p-8 text-white relative overflow-hidden group shadow-xl shadow-blue-900/10 animate-in fade-in zoom-in-95 duration-700 delay-100">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium border border-white/10">
                  +12.5% vs last month
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-blue-100 font-medium text-lg">
                  Total Revenue
                </p>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
                  Rp 187.450.000
                </h2>
                <p className="text-blue-200/80 text-sm max-w-sm mt-4 leading-relaxed">
                  Your revenue is growing steadily. The new product line
                  contributed 15% to this month&apos;s growth.
                </p>
              </div>
            </div>
          </div>

          {/* Secondary Stats */}
          {kpiStats.slice(0, 2).map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200"
            >
              <div className="flex justify-between items-start">
                <div
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
                    stat.bgColor,
                  )}
                >
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mt-4">
                  {stat.value}
                </h3>
                <p className="text-gray-500 text-sm font-medium mt-1">
                  {stat.title}
                </p>
              </div>
            </div>
          ))}

          {/* Growth Card */}
          <div className="bg-[#FF9600] rounded-[2rem] p-6 text-white shadow-lg shadow-orange-500/20 flex flex-col justify-between relative overflow-hidden group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors" />
            <Package className="w-8 h-8 text-white relative z-10" />
            <div className="relative z-10">
              <h3 className="text-4xl font-bold">+12,6%</h3>
              <p className="text-white/80 font-medium text-sm mt-1">
                Growth Rate
              </p>
            </div>
          </div>

          {/* Chart 1 - Wide Span */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900">Revenue Trend</h3>
              <p className="text-gray-500 text-sm">
                Monthly revenue vs sales performance
              </p>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#0F4C75" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#0F4C75" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f0f0f0"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9CA3AF", fontSize: 12 }}
                    dy={10}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "16px",
                      border: "none",
                      boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
                    }}
                    cursor={{
                      stroke: "#0F4C75",
                      strokeWidth: 1,
                      strokeDasharray: "4 4",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#94a3b8"
                    strokeWidth={2}
                    dot={false}
                    strokeDasharray="5 5"
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#0F4C75"
                    strokeWidth={4}
                    dot={false}
                    activeDot={{
                      r: 8,
                      fill: "#0F4C75",
                      strokeWidth: 4,
                      stroke: "#fff",
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2 - Narrow */}
          <div className="col-span-1 lg:col-span-1 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-400">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              By Category
            </h3>
            <div className="flex-1 min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical" barSize={12}>
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 11 }}
                    width={70}
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar
                    dataKey="value"
                    radius={[0, 4, 4, 0]}
                    background={{ fill: "#f1f5f9", radius: [0, 4, 4, 0] }}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
