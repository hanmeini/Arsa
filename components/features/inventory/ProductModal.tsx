"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Upload, Trash2 } from "lucide-react";
import { addProduct, updateProduct, Product } from "@/lib/firebase/inventory";
import { auth } from "@/lib/firebase/config";
import { cn } from "@/lib/utils";
import { uploadToCloudinary } from "@/lib/cloudinary";
import Image from "next/image";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
}

export function ProductModal({
  isOpen,
  onClose,
  productToEdit,
}: ProductModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setCategory(productToEdit.category);
      setPrice(productToEdit.price.toString());
      setStock(productToEdit.stock.toString());
      setImageUrl(productToEdit.image || "");
      setImagePreview(productToEdit.image || "");
    } else {
      setName("");
      setCategory("");
      setPrice("");
      setStock("");
      setImageFile(null);
      setImageUrl("");
      setImagePreview("");
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setImageUrl("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        alert("You must be logged in to add products");
        return;
      }

      let finalImageUrl = imageUrl;
      if (imageFile) {
        finalImageUrl = await uploadToCloudinary(imageFile);
      }

      const productData = {
        name,
        category,
        price: Number(price),
        stock: Number(stock),
        userId: currentUser.uid,
        image: finalImageUrl,
      };

      if (productToEdit && productToEdit.id) {
        await updateProduct(productToEdit.id, productData);
      } else {
        await addProduct(productData);
      }
      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl scale-100 animate-in zoom-in-95 duration-200 overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-900">
            {productToEdit ? "Edit Produk" : "Tambah Produk Baru"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Gambar Produk
            </label>
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "relative w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-gray-50 overflow-hidden transition-colors hover:bg-gray-100",
                  imagePreview && "border-solid border-gray-200",
                )}
              >
                {imagePreview ? (
                  <>
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-6 h-6 text-white" />
                    </button>
                  </>
                ) : (
                  <>
                    <Upload className="w-6 h-6 text-gray-400 mb-1" />
                    <span className="text-[10px] text-gray-400 font-medium">
                      Upload
                    </span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  disabled={loading}
                />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Upload gambar produk (JPG, PNG, max 2MB).
                  <br />
                  Gambar helps memudahkan identifikasi produk di inventaris.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Nama Produk
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all placeholder:text-gray-400"
              placeholder="Contoh: Kopi Arabika"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Kategori
            </label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all bg-white"
            >
              <option value="" disabled>
                Pilih Kategori
              </option>
              <option value="Makanan">Makanan</option>
              <option value="Minuman">Minuman</option>
              <option value="Pakaian">Pakaian</option>
              <option value="Elektronik">Elektronik</option>
              <option value="Kesehatan">Kesehatan</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Harga (Rp)
              </label>
              <input
                type="number"
                required
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all"
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Stok
              </label>
              <input
                type="number"
                required
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all"
                placeholder="0"
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3 sticky bottom-0 bg-white border-t border-gray-100 mt-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl font-medium text-gray-700 hover:bg-gray-50 border border-gray-200 transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "flex-1 px-4 py-2.5 rounded-xl font-bold text-white bg-[var(--primary)] hover:bg-[var(--primary)]/90 shadow-lg shadow-blue-500/30 transition-all flex justify-center items-center",
                loading && "opacity-70 cursor-not-allowed",
              )}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : productToEdit ? (
                "Simpan Perubahan"
              ) : (
                "Tambah Produk"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
