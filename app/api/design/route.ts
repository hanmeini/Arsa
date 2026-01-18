import { generateDesign } from "@/lib/deapi";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Validate that we have an image
    const file = formData.get("image");
    if (!file) {
      return NextResponse.json(
        { error: "Image file is required" },
        { status: 400 }
      );
    }

    const result = await generateDesign(formData);
    
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate design" },
      { status: 500 }
    );
  }
}
