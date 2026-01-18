"use client";

import { useState } from "react";
import { Edit2, Trash2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  lastUpdated: string;
}

// Mock Data
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Keripik Singkong Balado",
    category: "Snack",
    price: 15000,
    stock: 5,
    lastUpdated: "2023-10-25",
  },
  {
    id: "2",
    name: "Kopi Arabika Gayo 200g",
    category: "Beverage",
    price: 85000,
    stock: 24,
    lastUpdated: "2023-10-24",
  },
  {
    id: "3",
    name: "Sambal Bawang Botol",
    category: "Condiment",
    price: 25000,
    stock: 45,
    lastUpdated: "2023-10-26",
  },
  {
    id: "4",
    name: "Kain Batik Tulis",
    category: "Fashion",
    price: 450000,
    stock: 2,
    lastUpdated: "2023-10-20",
  },
  {
    id: "5",
    name: "Madu Hutan Asli",
    category: "Health",
    price: 120000,
    stock: 12,
    lastUpdated: "2023-10-22",
  },
];

export function InventoryTable() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const getStockStatus = (stock: number) => {
    if (stock <= 5)
      return { color: "text-red-600 bg-red-50", label: "Low Stock" };
    if (stock <= 20)
      return { color: "text-amber-600 bg-amber-50", label: "Medium" };
    return { color: "text-green-600 bg-green-50", label: "In Stock" };
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm whitespace-nowrap">
        <thead className="uppercase tracking-wider border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-6 py-4 font-semibold text-gray-900">
              Product Name
            </th>
            <th className="px-6 py-4 font-semibold text-gray-900">Category</th>
            <th className="px-6 py-4 font-semibold text-gray-900">Price</th>
            <th className="px-6 py-4 font-semibold text-gray-900">
              Stock Level
            </th>
            <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
            <th className="px-6 py-4 font-semibold text-gray-900 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.map((product) => {
            const status = getStockStatus(product.stock);
            return (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {product.name}
                </td>
                <td className="px-6 py-4 text-gray-500">{product.category}</td>
                <td className="px-6 py-4 text-gray-500">
                  Rp {product.price.toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-4 text-gray-900 font-medium">
                  {product.stock}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                      status.color
                    )}
                  >
                    {product.stock <= 5 && <AlertCircle className="w-3 h-3" />}
                    {status.label}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-[var(--primary)] hover:bg-indigo-50 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
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
