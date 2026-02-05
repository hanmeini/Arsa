"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { CurvedDock } from "@/components/layout/CurvedDock"; // Added
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return null; // Will redirect
  }

  const isChatPage = pathname === "/chat";
  const isStudioPage = pathname.startsWith("/template") || pathname === "/studio";
  const hideDock = isChatPage || isStudioPage;

  // Get main content class based on page type
  const getMainClass = () => {
    if (isChatPage) {
      return "h-screen overflow-hidden p-0"; // Chat: fixed height, no scroll
    }
    if (isStudioPage) {
      return "min-h-screen overflow-auto"; // Template/Studio: scrollable, no dock padding
    }
    return "min-h-screen pb-32"; // Default: scrollable with dock padding
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Background Gradient Spot (Optional context ambience) */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-br from-blue-50 via-white to-orange-50 opacity-60 -z-10" />

      {/* Main Content Area */}
      <main
        className={cn(
          "flex-1 transition-all duration-300 w-full relative",
          getMainClass()
        )}
      >
        {children}
      </main>

      {/* The New Curved Dock - Hidden on chat/template/studio pages */}
      {!hideDock && <CurvedDock />}

      {/* Hide BottomNav since we have Dock now (or keep it for mobile only if Dock is desktop only?) 
          The User asked for "Curved Dock", usually implied for desktop. Mobile might still need bottom nav.
          But the Dock looks like a Bottom Nav too. Let's use Dock for both for now to be "anti-mainstream".
      */}
    </div>
  );
}
