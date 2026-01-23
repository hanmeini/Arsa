"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
  enter: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for "premium" feel
      }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
}
