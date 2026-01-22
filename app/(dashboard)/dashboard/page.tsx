import { Header } from "@/components/dashboard/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview of your business performance",
};
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { TemplatesSection } from "@/components/dashboard/TemplatesSection";
import { TrendChart } from "@/components/dashboard/TrendChart";

import { generateDashboardData } from "@/lib/gemini";

export default async function DashboardPage() {
  const data = await generateDashboardData();

  return (
    <div className="min-h-screen pb-20 relative isolate bg-gradient-to-b from-[#89C0E0]/30 to-[#FFFFFF]/30">
      {/* Background Dots Pattern */}
      <div
        className="absolute top-0 inset-x-0 h-screen opacity-60 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(#94a3b8 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
          maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 50%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-8">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Hero Banner - Spans 2 cols */}
          <div className="lg:col-span-2">
            <WelcomeBanner />
          </div>

          {/* Stats Widget - Spans 1 col */}
          <div className="lg:col-span-1">
            <StatsCards stats={data.stats} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Templates Section */}
          <div className="mb-8 p-6 lg:col-span-2">
            <TemplatesSection />
          </div>

          {/* Trend Chart - Spans 1 col */}
          <div className="lg:col-span-1 h-full">
            <TrendChart data={data.trend} />
          </div>
        </div>
      </div>
    </div>
  );
}
