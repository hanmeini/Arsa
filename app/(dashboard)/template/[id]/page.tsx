import { TemplateGenerator } from "@/components/dashboard/TemplateGenerator";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TemplatePage({ params }: PageProps) {
  const resolvedParams = await params;

  return (
    <div className="min-h-screen relative isolate bg-linear-to-b from-[#89C0E0]/30 to-[#FFFFFF]/30">
      {/* Background Dots Pattern (Matching Dashboard) */}
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

      <div className="relative z-10 max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8">
        <TemplateGenerator
          apiKey={process.env.GEMINI_API_KEY || ""}
          templateId={resolvedParams.id}
        />
      </div>
    </div>
  );
}
