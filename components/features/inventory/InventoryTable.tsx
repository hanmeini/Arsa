"use client";

import { Edit2, Trash2, AlertCircle, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/firebase/inventory";
import Image from "next/image";

interface InventoryTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function InventoryTable({
  products,
  onEdit,
  onDelete,
}: InventoryTableProps) {
  const getStockStatus = (stock: number) => {
    if (stock <= 5)
      return {
        color: "text-red-700 bg-red-50 border-red-100",
        label: "Low Stock",
      };
    if (stock <= 20)
      return {
        color: "text-amber-700 bg-amber-50 border-amber-100",
        label: "Medium",
      };
    return {
      color: "text-green-700 bg-green-50 border-green-100",
      label: "In Stock",
    };
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
          <Package className="w-8 h-8 text-[var(--primary)]" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          Belum ada produk
        </h3>
        <p className="text-gray-500 text-sm">
          Mulai tambahkan produk untuk mengatur inventaris.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-sm">
      <table className="min-w-full text-left text-sm whitespace-nowrap">
        <thead className="uppercase tracking-wider border-b border-gray-100 bg-gray-50/50">
          <tr>
            <th className="px-6 py-4 font-bold text-gray-700">Produk</th>
            <th className="px-6 py-4 font-bold text-gray-700">Kategori</th>
            <th className="px-6 py-4 font-bold text-gray-700">Harga</th>
            <th className="px-6 py-4 font-bold text-gray-700">Stok</th>
            <th className="px-6 py-4 font-bold text-gray-700">Status</th>
            <th className="px-6 py-4 font-bold text-gray-700 text-right">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.map((product) => {
            const status = getStockStatus(product.stock);
            return (
              <tr
                key={product.id}
                className="hover:bg-blue-50/30 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-gray-300">
                          <Package className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    <span className="font-semibold text-gray-900">
                      {product.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium border border-gray-200">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 font-medium">
                  Rp {product.price.toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-4 text-gray-900 font-bold">
                  {product.stock}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border",
                      status.color,
                    )}
                  >
                    {product.stock <= 5 && <AlertCircle className="w-3 h-3" />}
                    {status.label}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end items-center gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 text-gray-400 hover:text-[var(--primary)] hover:bg-blue-50 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => product.id && onDelete(product.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
