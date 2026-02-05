"use client";

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import {
  Mail,
  Lock,
  Loader2,
  Eye,
  EyeOff,
  User as UserIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { AuthLayout } from "@/components/auth/AuthLayout";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: fullName,
        });
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Failed to register");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to login with Google");
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AuthLayout
      title={<>Bergabung <br /> bersama Arsa</>}
      subtitle="Mulai langkah digital Anda sekarang dengan platform manajemen bisnis terlengkap."
    >
      {/* Mascot Peeking Animation */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 10,
          delay: 0.6, // Delayed after card
        }}
        className="flex justify-center mb-[-35px] relative z-0"
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/icons/icon-login.svg"
            alt="Arsa Mascot"
            width={150}
            height={150}
            className="object-contain drop-shadow-lg"
          />
        </motion.div>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }} // Appears first
        className="bg-white/80 backdrop-blur-sm rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-white/50 p-8 md:p-10 relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-[#0F4C75] mb-2">
            Buat Akun Anda
          </h2>
          <p className="text-gray-400 text-sm">
            Silahkan masukan akun Anda disini
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleRegister}>
          {/* Full Name Input */}
          <div className="space-y-1">
            <div className="relative group">
              <UserIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#FF9600] transition-colors" />
              <input
                type="text"
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50/50 border border-transparent focus:border-[#FF9600]/30 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#FF9600]/10 text-gray-900 placeholder:text-gray-400 text-sm font-medium transition-all"
                placeholder="Nama Lengkap"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-1">
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#FF9600] transition-colors" />
              <input
                type="email"
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50/50 border border-transparent focus:border-[#FF9600]/30 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#FF9600]/10 text-gray-900 placeholder:text-gray-400 text-sm font-medium transition-all"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#FF9600] transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-gray-50/50 border border-transparent focus:border-[#FF9600]/30 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#FF9600]/10 text-gray-900 placeholder:text-gray-400 text-sm font-medium transition-all"
                placeholder="Kata sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-50 text-red-500 text-xs rounded-lg text-center font-medium border border-red-100"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full py-3.5 rounded-xl text-white font-bold text-sm bg-[#F7931A] hover:bg-[#E68A00] transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 active:scale-[0.98]",
              loading && "opacity-70 cursor-not-allowed",
            )}
          >
            <span className="relative z-10">
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5 mx-auto" />
              ) : (
                "Buat Akun"
              )}
            </span>
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <div className="flex items-center justify-center text-xs text-gray-400 uppercase tracking-widest font-semibold gap-2">
            <span className="w-8 border-t border-gray-200"></span>
            Hubungkan akun
            <span className="w-8 border-t border-gray-200"></span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="mx-auto bg-[#FCF6E5] hover:bg-[#F5EBCF] border border-transparent p-4 rounded-full transition-colors flex items-center justify-center"
          >
            <Image
              src="/icons/material-icon-theme_google.svg"
              alt="Google"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </motion.button>

          <p className="text-sm text-gray-500 font-medium">
            Sudah mengenal Arsa?{" "}
            <Link
              href="/login"
              className="text-[#0F4C75] font-bold hover:underline"
            >
              Masuk
            </Link>
          </p>
        </div>
      </motion.div>
    </AuthLayout>
  );
}
