import { db } from "./config";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  orderBy,
  Timestamp,
  writeBatch,
  doc
} from "firebase/firestore";

export interface TransactionItem {
    productId: string;
    productName: string;
    qty: number;
    price: number;
}

export interface Transaction {
  id?: string;
  userId: string;
  date: any; // Firestore Timestamp
  totalAmount: number;
  items: TransactionItem[];
  status: "Success" | "Pending" | "Failed";
  paymentMethod: string;
  source: "Manual" | "Shopee" | "TikTok" | "Tokopedia";
  customerName?: string; // Optional for manual/imported
}

const COLLECTION_NAME = "transactions";

export const addTransaction = async (transaction: Omit<Transaction, "id">) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), transaction);
    return docRef.id;
  } catch (error) {
    console.error("Error adding transaction: ", error);
    throw error;
  }
};

export const subscribeToTransactions = (userId: string, callback: (data: Transaction[]) => void) => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where("userId", "==", userId)
  );

  return onSnapshot(q, (snapshot) => {
    const transactions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Transaction[];
    
    // Client-side sort to avoid index requirement
    transactions.sort((a, b) => {
        const dateA = a.date?.seconds ? a.date.seconds : new Date(a.date).getTime() / 1000;
        const dateB = b.date?.seconds ? b.date.seconds : new Date(b.date).getTime() / 1000;
        return dateB - dateA;
    });

    callback(transactions);
  });
};

// Batch insert for demo data
export const createDemoTransactions = async (userId: string, transactions: Omit<Transaction, "id">[]) => {
    const batch = writeBatch(db);
    
    transactions.forEach(trx => {
        const docRef = doc(collection(db, COLLECTION_NAME));
        batch.set(docRef, trx);
    });

    await batch.commit();
};
