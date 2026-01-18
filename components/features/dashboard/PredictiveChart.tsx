"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { name: "Mon", sales: 4000, demand: 2400 },
  { name: "Tue", sales: 3000, demand: 1398 },
  { name: "Wed", sales: 2000, demand: 9800 },
  { name: "Thu", sales: 2780, demand: 3908 },
  { name: "Fri", sales: 1890, demand: 4800 },
  { name: "Sat", sales: 2390, demand: 3800 },
  { name: "Sun", sales: 3490, demand: 4300 },
];

export function PredictiveChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#E5E7EB"
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#6B7280", fontSize: 12 }}
          dy={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#6B7280", fontSize: 12 }}
        />
        <Tooltip
          contentStyle={{
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
        />
        <Area
          type="monotone"
          dataKey="sales"
          stroke="#6366F1"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorSales)"
        />
        <Area
          type="monotone"
          dataKey="demand"
          stroke="#F59E0B"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorDemand)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
