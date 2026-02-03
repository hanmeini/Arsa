import { db } from "./firebase/config";
import { collection, writeBatch, doc, Timestamp, query, where, getDocs, limit } from "firebase/firestore";
import { Product } from "./firebase/inventory";
import { Transaction } from "./firebase/sales";

export const generateDemoData = async (userId: string) => {
  const batch = writeBatch(db);

  // 1. Demo Products
  const products: Omit<Product, "id" | "createdAt" | "updatedAt">[] = [
    { name: "Kopi Arabika Gayo", category: "Minuman", price: 85000, stock: 50, userId },
    { name: "Keripik Singkong Pedas", category: "Makanan", price: 15000, stock: 200, userId },
    { name: "Baju Batik Pria", category: "Pakaian", price: 150000, stock: 30, userId },
    { name: "Tas Anyaman Rotan", category: "Kerajinan", price: 250000, stock: 15, userId },
    { name: "Madu Hutan Asli", category: "Minuman", price: 120000, stock: 40, userId },
    { name: "Sambal Bawang Botol", category: "Makanan", price: 35000, stock: 100, userId },
  ];

  products.forEach((p) => {
    const ref = doc(collection(db, "inventory"));
    batch.set(ref, {
        ...p,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
    });
  });

  // 2. Demo Transactions (Last 30 days)
  const sources = ["Shopee", "TikTok", "Manual", "Tokopedia"] as const;
  const statuses = ["Success", "Success", "Success", "Pending"] as const; // skew to success

  for (let i = 0; i < 50; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30)); // Random date within last 30 days
    
    const amount = Math.floor(Math.random() * 500000) + 50000;
    const source = sources[Math.floor(Math.random() * sources.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    const trx: Omit<Transaction, "id"> = {
        userId,
        date: Timestamp.fromDate(date),
        totalAmount: amount,
        items: [], // Simplified for demo reports
        status: status,
        paymentMethod: "Transfer Bank",
        source: source,
        customerName: `Customer Demo ${i+1}`
    };

    const ref = doc(collection(db, "transactions"));
    batch.set(ref, trx);
  }

  await batch.commit();
};

export const checkAndSeedData = async (userId: string) => {
    // Check if user already has transactions
    const q = query(
        collection(db, "transactions"), 
        where("userId", "==", userId),
        limit(1)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        console.log("New user detected (no transactions). Seeding demo data...");
        await generateDemoData(userId);
        return true; // Seeded
    }
    return false; // Already has data
};
