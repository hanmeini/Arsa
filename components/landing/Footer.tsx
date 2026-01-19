"use client";

import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  {
    title: "Perusahaan",
    links: [
      { label: "Tentang Kami", href: "#" },
      { label: "Karir", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Partner", href: "#" },
    ],
  },
  {
    title: "Produk",
    links: [
      { label: "Fitur Utama", href: "#" },
      { label: "Harga", href: "#" },
      { label: "Integrasi", href: "#" },
      { label: "Enterprise", href: "#" },
    ],
  },
  {
    title: "Dukungan",
    links: [
      { label: "Pusat Bantuan", href: "#" },
      { label: "Komunitas", href: "#" },
      { label: "Dokumentasi", href: "#" },
      { label: "Status API", href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Facebook, href: "#", label: "Facebook" },
];

export function Footer() {
  return (
    <footer className="bg-[#0D0E25] text-white pt-24 pb-12 relative overflow-hidden font-sans">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#0F4C75] rounded-full mix-blend-screen filter blur-[100px] opacity-20" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#FF9600] rounded-full mix-blend-screen filter blur-[100px] opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="inline-block mb-6">
                {/* Replace this with actual Logo image if available */}
                <h2 className="text-3xl font-bold tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0A70AB] to-[#FE8B1D]">
                    Arsa
                  </span>
                  <span className="text-[#FF9600]">.</span>
                </h2>
              </Link>
              <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-sm font-light">
                Platform asisten bisnis AI terdepan yang membantu UMKM tumbuh
                lebih cepat dengan teknologi cerdas dan wawasan bisnis yang
                akurat.
              </p>

              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#FF9600] hover:text-white transition-all duration-300 border border-white/10 hover:border-transparent"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerLinks.map((column, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <h3 className="text-lg font-semibold text-white mb-6">
                  {column.title}
                </h3>
                <ul className="space-y-4">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-[#FF9600] text-sm font-light transition-colors duration-200 inline-flex items-center group"
                      >
                        <span className="relative">
                          {link.label}
                          <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#FF9600] transition-all duration-300 group-hover:w-full" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#151730] p-6 rounded-2xl border border-white/5"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                Tetap Terhubung
              </h3>
              <p className="text-gray-400 text-sm font-light mb-6">
                Dapatkan tips bisnis dan update terbaru langsung ke inbox Anda.
              </p>

              <form className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    placeholder="Alamat Email"
                    className="w-full bg-[#0D0E25] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#FF9600] focus:ring-1 focus:ring-[#FF9600] transition-all placeholder:text-gray-600"
                  />
                </div>
                <button
                  type="button"
                  className="w-full bg-[#0F4C75] hover:bg-[#0A3A5E] text-white text-sm font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 group"
                >
                  Berlangganan
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="text-gray-500 text-sm font-light text-center md:text-left">
            &copy; {new Date().getFullYear()} Arsa AI. Hak Cipta Dilindungi.
          </div>
          <div className="flex gap-6 text-sm text-gray-500 font-light">
            <Link href="#" className="hover:text-[#FF9600] transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="#" className="hover:text-[#FF9600] transition-colors">
              Syarat & Ketentuan
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
