import { ContentStudio } from "@/components/features/studio/ContentStudio";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Studio",
  description: "Create AI-powered product content",
};

export default function StudioPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900">AI Content Studio</h1>
        <p className="text-gray-500">
          Create stunning product photos and descriptions in seconds.
        </p>
      </div>

      <ContentStudio />
    </div>
  );
}
