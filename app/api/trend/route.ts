import { generateDashboardData } from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const month = searchParams.get("month") || "Januari";
  const year = searchParams.get("year") || "2026";

  try {
    const data = await generateDashboardData(month, year);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch trend data" },
      { status: 500 }
    );
  }
}
