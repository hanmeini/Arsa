"use client";

import { useState } from "react";
import {
  Upload,
  X,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImportTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: any[]) => void;
}

export const ImportTransactionModal = ({
  isOpen,
  onClose,
  onImport,
}: ImportTransactionModalProps) => {
  const [step, setStep] = useState<"upload" | "preview" | "success">("upload");
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [platform, setPlatform] = useState<
    "shopee" | "tiktok" | "tokopedia" | "manual"
  >("shopee");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const processFile = () => {
    setIsProcessing(true);
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setStep("preview");
    }, 1500);
  };

  const confirmImport = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep("success");
      // Trigger parent callback with dummy data for now
      onImport([
        {
          id: "IMP-001",
          date: "2023-10-25",
          source: platform,
          total: 150000,
          items: 3,
        },
        {
          id: "IMP-002",
          date: "2023-10-26",
          source: platform,
          total: 75000,
          items: 1,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="bg-white rounded-2xl w-full max-w-lg relative z-50 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Import Transaksi
            </h2>
            <p className="text-sm text-gray-500">
              Upload laporan penjualan dari marketplace
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {step === "upload" && (
            <div className="space-y-6">
              {/* Platform Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Pilih Sumber Data
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPlatform("shopee")}
                    className={cn(
                      "p-3 border rounded-xl flex items-center gap-3 transition-all",
                      platform === "shopee"
                        ? "border-[#FF5722] bg-[#FF5722]/5 ring-1 ring-[#FF5722]"
                        : "border-gray-200 hover:border-gray-300",
                    )}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#FF5722] flex items-center justify-center text-white font-bold text-xs">
                      S
                    </div>
                    <span className="font-medium text-gray-700">Shopee</span>
                  </button>
                  <button
                    onClick={() => setPlatform("tiktok")}
                    className={cn(
                      "p-3 border rounded-xl flex items-center gap-3 transition-all",
                      platform === "tiktok"
                        ? "border-black bg-black/5 ring-1 ring-black"
                        : "border-gray-200 hover:border-gray-300",
                    )}
                  >
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold text-xs">
                      T
                    </div>
                    <span className="font-medium text-gray-700">
                      TikTok Shop
                    </span>
                  </button>
                  <button
                    onClick={() => setPlatform("tokopedia")}
                    className={cn(
                      "p-3 border rounded-xl flex items-center gap-3 transition-all",
                      platform === "tokopedia"
                        ? "border-[#42B549] bg-[#42B549]/5 ring-1 ring-[#42B549]"
                        : "border-gray-200 hover:border-gray-300",
                    )}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#42B549] flex items-center justify-center text-white font-bold text-xs">
                      T
                    </div>
                    <span className="font-medium text-gray-700">Tokopedia</span>
                  </button>
                  <button
                    onClick={() => setPlatform("manual")}
                    className={cn(
                      "p-3 border rounded-xl flex items-center gap-3 transition-all",
                      platform === "manual"
                        ? "border-gray-500 bg-gray-500/5 ring-1 ring-gray-500"
                        : "border-gray-200 hover:border-gray-300",
                    )}
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold text-xs">
                      M
                    </div>
                    <span className="font-medium text-gray-700">
                      Manual Excel
                    </span>
                  </button>
                </div>
              </div>

              {/* Drag & Drop Area */}
              <div
                className={cn(
                  "border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer relative",
                  dragActive
                    ? "border-[var(--primary)] bg-[var(--primary)]/5"
                    : "border-gray-300 hover:border-[var(--primary)] hover:bg-gray-50",
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept=".csv, .xlsx, .xls"
                  onChange={handleFileChange}
                />
                {file ? (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
                      <FileSpreadsheet className="w-6 h-6" />
                    </div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                    <button
                      className="mt-3 text-xs text-red-500 hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        setFile(null);
                      }}
                    >
                      Hapus file
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-3">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="font-medium text-gray-900">
                      Klik untuk upload atau drag & drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      File didukung: .csv, .xlsx (Max 5MB)
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          {step === "preview" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-bold text-green-800">
                    File berhasil dibaca!
                  </p>
                  <p className="text-xs text-green-600">
                    Ditemukan 128 transaksi baru dari {platform}.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-xs font-bold text-gray-500 uppercase mb-2">
                  Preview Data
                </p>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex justify-between text-sm py-2 border-b border-gray-200 last:border-0"
                    >
                      <span className="text-gray-700">
                        TRX-SHOPEE-{202400 + i}
                      </span>
                      <span className="font-medium text-gray-900">
                        Rp {(150000 * i).toLocaleString("id-ID")}
                      </span>
                    </div>
                  ))}
                  <div className="text-center text-xs text-gray-400 pt-2 italic">
                    + 125 baris lainnya
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-300">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Import Berhasil!
              </h3>
              <p className="text-gray-500 mt-2">
                Data transaksi telah berhasil ditambahkan ke riwayat penjualan.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
          {step === "upload" && (
            <>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-gray-600 hover:bg-gray-200 font-medium transition-colors text-sm"
              >
                Batal
              </button>
              <button
                onClick={processFile}
                disabled={!file || isProcessing}
                className="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary)]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[var(--primary)]/20 flex items-center gap-2 text-sm"
              >
                {isProcessing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Lanjutkan"
                )}
              </button>
            </>
          )}

          {step === "preview" && (
            <>
              <button
                onClick={() => setStep("upload")}
                className="px-5 py-2.5 rounded-xl text-gray-600 hover:bg-gray-200 font-medium transition-colors text-sm"
              >
                Kembali
              </button>
              <button
                onClick={confirmImport}
                disabled={isProcessing}
                className="px-5 py-2.5 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-green-600/20 flex items-center gap-2 text-sm"
              >
                {isProcessing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Simpan Data"
                )}
              </button>
            </>
          )}

          {step === "success" && (
            <button
              onClick={onClose}
              className="w-full px-5 py-2.5 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-all text-sm"
            >
              Selesai
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
