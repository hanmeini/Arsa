import { db } from "./config";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  getDocs,
  limit,
} from "firebase/firestore";

export interface Message {
  id?: string;
  role: "user" | "model";
  content: string;
  createdAt: any;
}

export interface ChatSession {
  id: string;
  userId: string;
  title: string;
  createdAt: any;
  updatedAt: any;
  lastMessage?: string;
}

const CHATS_COLLECTION = "chats";
const MESSAGES_COLLECTION = "messages";

export const createChat = async (userId: string, title: string) => {
  try {
    const docRef = await addDoc(collection(db, CHATS_COLLECTION), {
      userId,
      title,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
};

export const sendMessage = async (chatId: string, role: "user" | "model", content: string) => {
  try {
    await addDoc(collection(db, CHATS_COLLECTION, chatId, MESSAGES_COLLECTION), {
      role,
      content,
      createdAt: serverTimestamp(),
    });

    // Update last message in chat session
    const chatRef = doc(db, CHATS_COLLECTION, chatId);
    await updateDoc(chatRef, {
      lastMessage: content.substring(0, 50) + (content.length > 50 ? "..." : ""),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const subscribeToChats = (userId: string, callback: (chats: ChatSession[]) => void) => {
  // Use a simpler query first to avoid index issues
  const q = query(
    collection(db, CHATS_COLLECTION),
    where("userId", "==", userId)
    // removed orderBy("updatedAt", "desc") to prevent index error
  );

  return onSnapshot(q, (snapshot) => {
    const chats = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ChatSession[];
    
    // Client-side sort
    chats.sort((a, b) => {
        const timeA = a.updatedAt?.toMillis() || 0;
        const timeB = b.updatedAt?.toMillis() || 0;
        return timeB - timeA;
    });

    callback(chats);
  });
};

export const subscribeToMessages = (chatId: string, callback: (messages: Message[]) => void) => {
  const q = query(
    collection(db, CHATS_COLLECTION, chatId, MESSAGES_COLLECTION),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Message[];
    callback(messages);
  });
};
