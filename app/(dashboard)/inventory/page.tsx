"use client";

import { useState, useEffect } from "react";
import { SectionContainer } from "@/components/dashboard/SectionContainer";
import { InventoryTable } from "@/components/features/inventory/InventoryTable";
import { ProductModal } from "@/components/features/inventory/ProductModal";
import {
  Product,
  subscribeToProducts,
  deleteProduct,
} from "@/lib/firebase/inventory";
import { auth } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { Plus, Search, Package, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <SectionContainer>
      <div className="space-y-8 pb-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              Inventory
            </h1>
            <p className="text-lg text-gray-500 mt-2 font-light">
              Manage your product catalog with style.
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="group relative bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <div className="flex items-center gap-2 relative z-10">
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </div>
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="sticky top-0 z-20 bg-gray-50/80 backdrop-blur-xl py-4 -mx-4 px-4 md:-mx-8 md:px-8 border-b border-gray-100 flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <div className="relative flex-1 max-w-xl group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400 group-focus-within:text-[var(--primary)] transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search products, SKU, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border-0 shadow-sm ring-1 ring-gray-100 focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all placeholder:text-gray-400 text-gray-900"
            />
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-64 bg-white rounded-[2rem] animate-pulse border border-gray-100"
              />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Package className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-medium text-gray-900">
              No products found
            </h3>
            <p className="text-gray-500 mt-2 max-w-sm mx-auto">
              Try adjusting your search or add a new product to your inventory.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="group bg-white rounded-[2rem] p-6 border border-gray-100 hover:border-[var(--primary)]/30 shadow-sm hover:shadow-xl hover:shadow-[var(--primary)]/5 transition-all duration-500 flex flex-col justify-between relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Hover Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 flex justify-between items-start mb-6">
                  <div className="space-y-1">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-50 text-gray-500 border border-gray-100 uppercase tracking-wide">
                      {product.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-[var(--primary)] transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  {/* Action Menu (Visible on hover) */}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors shadow-sm"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id!)}
                      className="p-2 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors shadow-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="relative z-10 pt-6 border-t border-gray-50 mt-auto flex items-end justify-between">
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider mb-1">
                      Price
                    </p>
                    <p className="text-2xl font-bold text-gray-900 tracking-tight">
                      Rp {Number(product.price).toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider mb-1">
                      Stock
                    </p>
                    <div
                      className={cn(
                        "flex items-center gap-2 font-medium px-3 py-1.5 rounded-lg",
                        Number(product.stock) < 10
                          ? "bg-red-50 text-red-600"
                          : "bg-green-50 text-green-700",
                      )}
                    >
                      <span
                        className={cn(
                          "w-2 h-2 rounded-full",
                          Number(product.stock) < 10
                            ? "bg-red-500 animate-pulse"
                            : "bg-green-500",
                        )}
                      />
                      {product.stock}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          productToEdit={editingProduct || undefined}
        />
      </div>
    </SectionContainer>
  );
}
