import { SectionContainer } from "@/components/dashboard/SectionContainer";
import { generateDashboardData } from "@/lib/gemini";
import { ArrowUpRight, TrendingUp, Sparkles } from "lucide-react";

export default async function DashboardPage() {
  const data = await generateDashboardData();

  return (
    <SectionContainer>
      <div className="flex flex-col h-full justify-center space-y-8 md:space-y-16 py-10">
        {/* Greeting Section */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
            Selamat Pagi, Arsa.
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 font-light max-w-2xl">
            Berikut adalah denyut nadi bisnis Anda hari ini. Semuanya terlihat
            terkendali.
          </p>
        </div>

        {/* Narrative Insight */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            <div className="flex items-start gap-6 group">
              <div className="p-4 bg-orange-50 rounded-2xl group-hover:bg-orange-100 transition-colors duration-300 shrink-0">
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-medium text-gray-900">
                  Tren Positif
                </h3>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                  Penjualan Anda meningkat sebesar{" "}
                  <span className="font-semibold text-orange-600">
                    {data.stats.trend}%
                  </span>{" "}
                  bulan ini. Minat pelanggan terhadap desain baru cukup tinggi,
                  menyumbang sebagian besar trafik.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="p-4 bg-blue-50 rounded-2xl group-hover:bg-blue-100 transition-colors duration-300 shrink-0">
                <ArrowUpRight className="w-8 h-8 text-blue-500" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-medium text-gray-900">
                  Aktivitas Toko
                </h3>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                  Sebanyak{" "}
                  <span className="font-semibold text-blue-600">
                    {data.stats.views}
                  </span>{" "}
                  pengunjung melihat katalog Anda, dengan{" "}
                  <span className="font-semibold text-gray-900">
                    {data.stats.orders}
                  </span>{" "}
                  pesanan sukses. Konversi terlihat stabil.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="p-4 bg-purple-50 rounded-2xl group-hover:bg-purple-100 transition-colors duration-300 shrink-0">
                <Sparkles className="w-8 h-8 text-purple-500" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-medium text-gray-900">
                  Rekomendasi
                </h3>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                  Saran: Pertimbangkan untuk menambah stok bahan baku kategori A
                  mingggu depan untuk mengantisipasi lonjakan akhir bulan.
                </p>
              </div>
            </div>
          </div>

          {/* Abstract Visual / Hero Image */}
          <div className="relative h-[400px] w-full rounded-[3rem] overflow-hidden bg-linear-to-br from-orange-50 to-white border border-orange-100/50 items-center justify-center shadow-sm animate-in fade-in zoom-in-95 duration-1000 delay-200 hidden lg:flex">
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="text-center p-8 relative z-10">
              <span className="text-[10rem] font-bold text-orange-500/10 leading-none tracking-tighter select-none">
                {data.stats.trend}%
              </span>
              <p className="text-orange-900/40 font-medium text-lg mt-4 tracking-widest uppercase">
                Growth
              </p>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-200/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
