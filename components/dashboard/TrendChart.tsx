"use client";

import { useState, useEffect } from "react";
import { ChevronDown, TrendingUp, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const defaultTrendData = [10, 25, 15, 30, 45, 35, 50, 40, 60, 55, 70, 65, 80];
const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export function TrendChart({ data }: { data?: any }) {
  // Initialize state with props data if available, or default
  const [chartData, setChartData] = useState(data?.data || defaultTrendData);
  const [description, setDescription] = useState(
    data?.description || "Mengikuti perubahan kebutuhan dan selera desain",
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("Januari");
  const [isLoading, setIsLoading] = useState(false);

  // Effect to update local state if props change (initial load)
  useEffect(() => {
    if (data?.data) {
      setChartData(data.data);
      setDescription(data.description);
    }
  }, [data]);

  // Effect to fetch new data when month changes
  useEffect(() => {
    async function fetchTrendData() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/trend?month=${selectedMonth}&year=2026`);
        const json = await res.json();
        if (json?.trend?.data) {
          setChartData(json.trend.data);
          setDescription(json.trend.description);
        }
      } catch (err) {
        console.error("Failed to fetch trend data", err);
      } finally {
        setIsLoading(false);
      }
    }

    // Only fetch if we are client-side and interacting (skip initial redundant fetch if logic prefers)
    // But since selectedMonth is state, finding a way to skip first run if needed.
    // Actually, fine to fetch or just let it be.
    // Optimization: check if selectedMonth is default and we have initial data?
    // Let's just fetch to be sure we get specific data for that month if props were generic.
    if (selectedMonth) {
      fetchTrendData();
    }
  }, [selectedMonth]);

  const trendData = chartData;

  // Helper to generate SVG path from data points
  const generateChartPath = (points: number[], isArea: boolean = false) => {
    if (!points || points.length === 0) return "";

    const width = 100;
    const height = 100;
    const stepX = width / (points.length - 1);

    // Map points to [x, y] coordinates
    // y is inverted (100 is bottom, 0 is top)
    // We assume data values are 0-100 range.
    const coordinates = points.map((val, index) => {
      const x = index * stepX;
      // Clamp value between 0 and 100
      const clampedVal = Math.max(0, Math.min(100, val));
      const y = height - clampedVal; // Invert for SVG coords
      return [x, y];
    });

    // Build Path Command
    // Starting point
    let d = `M ${coordinates[0][0]},${coordinates[0][1]}`;

    // Simple Line segments for now (L) for robustness,
    // or we could do simple smoothing. Let's do simple Lines or Bezier?
    // Let's do simple Lines to guarantee it matches data points exactly.
    // Ideally we would compute control points for smooth curves.
    // For a "Trend" look, a bezier is nicer.
    // Simplified smoothing:

    for (let i = 0; i < coordinates.length - 1; i++) {
      const [p0x, p0y] = coordinates[Math.max(0, i - 1)];
      const [p1x, p1y] = coordinates[i];
      const [p2x, p2y] = coordinates[i + 1];
      const [p3x, p3y] = coordinates[Math.min(coordinates.length - 1, i + 2)];

      // Catmull-Rom to Cubic Bezier conversion logic is complex inline.
      // Let's stick to straight lines or use specific smoothing if the user insists.
      // For now: Straight lines with rounded joins (via stroke-linejoin) or a simple Quad Bezier.
      // Actually, let's use a simple strategy:
      // C (cp1x, cp1y) (cp2x, cp2y) (x, y)
      // Let's just use L for safety given the constraints, it's safer than broken curves.
      d += ` L ${p2x},${p2y}`;
    }

    if (isArea) {
      // Close the path for fill
      d += ` L ${width},${height} L 0,${height} Z`;
    }

    return d;
  };

  // Generate Smooth Path (using basic smoothing or just Lines)
  // Actually, to make it look "premium", let's use a smoothing trick or just straight lines.
  // Given the previous chart was smooth, let's try to simulate a smooth curve if possible.
  // For this iteration, I will output L commands. It is robust.
  const strokePath = generateChartPath(trendData, false);
  const fillPath = generateChartPath(trendData, true);

  return (
    <div className="flex flex-col h-full">
      {/* Invisible Spacer to align with TemplatesSection header */}
      <div className="mb-6 invisible select-none" aria-hidden="true">
        <h3 className="text-xl font-bold mb-1">Spacer Title</h3>
        <p className="text-sm">Spacer Description for alignment</p>
      </div>

      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex-1 flex flex-col relative min-h-[300px]">
        {/* Header Row: Title & Month Selector */}
        <div className="flex justify-between items-start mb-2 relative">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            <h3 className="font-bold text-gray-900 text-lg">Trend Desain</h3>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1 px-3 py-1 rounded-full border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 bg-white transition-colors"
            >
              {selectedMonth}{" "}
              <ChevronDown
                className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-32 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 max-h-60 overflow-y-auto"
                >
                  {months.map((month) => (
                    <button
                      key={month}
                      onClick={() => {
                        setSelectedMonth(month);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-bold flex items-center justify-between hover:bg-gray-50 ${
                        selectedMonth === month
                          ? "text-orange-500"
                          : "text-gray-600"
                      }`}
                    >
                      {month}
                      {selectedMonth === month && <Check className="w-3 h-3" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Sub-Header Row: Description & Year */}
        <div className="flex justify-between items-end mb-6">
          <p className="text-xs text-gray-400 max-w-[140px] leading-tight">
            {data?.description ||
              "Mengikuti perubahan kebutuhan dan selera desain"}
          </p>
          <span className="font-bold text-gray-900 text-lg">
            {data?.year || "2026"}
          </span>
        </div>

        {/* Chart Content */}
        <div className="flex gap-4 flex-1 w-full">
          {/* Y-Axis Labels */}
          <div className="flex flex-col justify-between text-[10px] text-gray-500 font-medium text-right py-2 h-full">
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
          <div className="flex-1 relative flex flex-col justify-between">
            {/* Grid Lines Overlay */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0 py-2">
              <div className="border-t border-dashed border-gray-200 w-full"></div>
              <div className="border-t border-dashed border-gray-200 w-full"></div>
              <div className="border-t border-dashed border-gray-200 w-full"></div>
              <div className="border-t border-dashed border-gray-200 w-full"></div>
              <div className="border-t border-dashed border-gray-200 w-full"></div>
              <div className="border-t border-dashed border-gray-200 w-full"></div>
              <div className="border-t border-dashed border-gray-200 w-full"></div>
              <div className="border-t border-gray-200 w-full"></div>
            </div>

            {/* SVG Chart */}
            <div className="absolute inset-0 z-10 py-2">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full overflow-visible"
              >
                <defs>
                  <linearGradient
                    id="trendGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#FB923C" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FB923C" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={fillPath} fill="url(#trendGradient)" />
                <path
                  d={strokePath}
                  fill="none"
                  stroke="#F97316"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* X- Axis Labels (Positioned absolutely at bottom) */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-between px-4 text-[10px] text-gray-400 font-medium">
              <span>Minimalism</span>
              <span>Morealism</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
