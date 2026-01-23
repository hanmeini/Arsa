"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

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

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-50 overflow-hidden relative">
      <main className="flex-1 w-full h-full relative overflow-hidden">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
