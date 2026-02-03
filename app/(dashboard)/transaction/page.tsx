"use client";

import { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Banknote,
  QrCode,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Product, subscribeToProducts } from "@/lib/firebase/inventory";
import { useAuth } from "@/context/AuthContext";
// We will need a new service for transactions, let's assume we'll create it
// import { createTransaction } from "@/lib/firebase/sales";

export default function TransactionPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<
    "cash" | "qris" | "transfer"
  >("cash");
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      const unsubscribe = subscribeToProducts(user.uid, (data) => {
        setProducts(data);
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item,
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const newQty = Math.max(1, item.qty + delta);
          // Check stock limit (optional, for now we assume unlimited/manual check)
          return { ...item, qty: newQty };
        }
        return item;
      }),
    );
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0,
  );
  const tax = 0; // Simple for now
  const total = subtotal + tax;

  const handleCheckout = async () => {
    if (!user || cart.length === 0) return;

    setIsProcessing(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // await createTransaction(...)

      setSuccess(true);
      setCart([]);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error(error);
      alert("Transaksi gagal");
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-theme(spacing.16))] md:h-screen overflow-hidden">
      {/* LEFT: Product Catalog */}
      <div className="flex-1 flex flex-col h-full bg-gray-50 border-r border-gray-200">
        {/* Header & Search */}
        <div className="p-6 bg-white border-b border-gray-100 shrink-0">
          <h1 className="text-2xl font-bold text-[#0F4C75] mb-4">
            Kasir / Transaksi Baru
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0F4C75]/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p>Produk tidak ditemukan</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="bg-white p-4 rounded-2xl border border-gray-100 hover:border-[#0F4C75] hover:shadow-md transition-all text-left group flex flex-col h-full"
                >
                  <div className="aspect-square bg-gray-100 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-2xl font-bold text-gray-300 uppercase">
                        {product.name.substring(0, 2)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-[#0F4C75]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Plus className="w-8 h-8 text-[#0F4C75] bg-white rounded-full p-1.5 shadow-sm" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                  <div className="mt-auto flex justify-between items-center">
                    <p className="text-[#0F4C75] font-bold">
                      Rp {product.price.toLocaleString("id-ID")}
                    </p>
                    <p className="text-xs text-gray-500">
                      {product.stock} stok
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Cart & Checkout */}
      <div className="w-full lg:w-[400px] bg-white flex flex-col h-full shadow-xl z-20 shrink-0">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#0F4C75]" />
            Keranjang Belanja
          </h2>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4 opacity-50">
              <ShoppingCart className="w-16 h-16" />
              <p>Keranjang kosong</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 items-center bg-gray-50 p-3 rounded-xl animate-in slide-in-from-right-4 duration-300"
              >
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0 border border-gray-100">
                  {item.product.image ? (
                    <img
                      src={item.product.image}
                      alt=""
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-xs font-bold text-gray-400">
                      {item.product.name.substring(0, 2)}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-xs text-[#0F4C75] font-bold">
                    Rp {item.product.price.toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
                  <button
                    onClick={() => updateQty(item.product.id!, -1)}
                    className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold w-4 text-center">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.product.id!, 1)}
                    className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id!)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Section */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 space-y-4">
          {/* Payment Method */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
              Metode Pembayaran
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setPaymentMethod("cash")}
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-xl border transition-all",
                  paymentMethod === "cash"
                    ? "bg-white border-[#0F4C75] shadow-sm text-[#0F4C75]"
                    : "border-gray-200 text-gray-400 hover:bg-white",
                )}
              >
                <Banknote className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-medium">Tunai</span>
              </button>
              <button
                onClick={() => setPaymentMethod("qris")}
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-xl border transition-all",
                  paymentMethod === "qris"
                    ? "bg-white border-[#0F4C75] shadow-sm text-[#0F4C75]"
                    : "border-gray-200 text-gray-400 hover:bg-white",
                )}
              >
                <QrCode className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-medium">QRIS</span>
              </button>
              <button
                onClick={() => setPaymentMethod("transfer")}
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-xl border transition-all",
                  paymentMethod === "transfer"
                    ? "bg-white border-[#0F4C75] shadow-sm text-[#0F4C75]"
                    : "border-gray-200 text-gray-400 hover:bg-white",
                )}
              >
                <CreditCard className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-medium">Transfer</span>
              </button>
            </div>
          </div>

          {/* Totals */}
          <div className="space-y-2 pt-2 border-t border-gray-200/50">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>Rp {total.toLocaleString("id-ID")}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            disabled={cart.length === 0 || isProcessing || success}
            className={cn(
              "w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2",
              success
                ? "bg-green-500 hover:bg-green-600"
                : "bg-[#0F4C75] hover:bg-[#0F4C75]/90",
              (cart.length === 0 || isProcessing) &&
                "opacity-50 cursor-not-allowed",
            )}
          >
            {isProcessing ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : success ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Berhasil!
              </>
            ) : (
              <>Bayar Sekarang</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
