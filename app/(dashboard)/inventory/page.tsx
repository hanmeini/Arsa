import { InventoryTable } from "@/components/features/inventory/InventoryTable";

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Inventory Management
          </h1>
          <p className="text-gray-500">
            Track your stock levels and get alerts.
          </p>
        </div>
        <button className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[var(--primary)]/90 transition-colors">
          + Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <InventoryTable />
      </div>
    </div>
  );
}
