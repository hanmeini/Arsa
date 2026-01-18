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

export default function DashboardPage() {
  return (
    <div className="min-h-screen pb-20">
      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Main Hero Banner - Spans 2 cols */}
        <div className="lg:col-span-2">
          <WelcomeBanner />
        </div>

        {/* Stats Widget - Spans 1 col */}
        <div className="lg:col-span-1">
          <StatsCards />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Templates Section - Spans 3 cols */}
        <div className="lg:col-span-3">
          <TemplatesSection />
        </div>

        {/* Trend Chart - Spans 1 col */}
        <div className="lg:col-span-1">
          <TrendChart />
        </div>
      </div>
    </div>
  );
}
