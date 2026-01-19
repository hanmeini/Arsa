"use client";

import { useState, useEffect } from "react";
import { InventoryTable } from "@/components/features/inventory/InventoryTable";
import { ProductModal } from "@/components/features/inventory/ProductModal";
import {
  Product,
  subscribeToProducts,
  deleteProduct,
} from "@/lib/firebase/inventory";
import { auth } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { Plus, Search } from "lucide-react";

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribeProducts = subscribeToProducts(
          user.uid,
          (fetchedProducts) => {
            setProducts(fetchedProducts);
            setLoading(false);
          },
        );
        return () => unsubscribeProducts();
      } else {
        setProducts([]);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handleAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      try {
        await deleteProduct(id);
      } catch (error) {
        alert("Gagal menghapus produk");
      }
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Manajemen Inventaris
          </h1>
          <p className="text-gray-500 mt-1">
            Pantau dan kelola stok produk Anda dengan mudah.
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-[var(--primary)] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[var(--primary)]/90 transition-all shadow-lg shadow-[var(--primary)]/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Tambah Produk
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari produk atau kategori..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all text-sm"
          />
        </div>
        {/* Filters could go here */}
      </div>

      {/* Table Section */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
        </div>
      ) : (
        <InventoryTable
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productToEdit={editingProduct || undefined}
      />
    </div>
  );
}
