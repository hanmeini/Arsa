"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

export const CustomCursor = () => {
  const pathname = usePathname();
  const [isHovering, setIsHovering] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Check if we are in a dashboard route (not landing pages)
  const isDashboard =
    !["/", "/about", "/pricing", "/contact", "/login", "/register"].includes(
      pathname,
    ) && !pathname.startsWith("/showcase");

  // Mobile check
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check if hovering over text input fields
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("input") ||
        target.closest("textarea")
      ) {
        setIsTyping(true);
        setIsHovering(false);
      }
      // Check if hovering over clickable elements
      else if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsHovering(true);
        setIsTyping(false);
      } else {
        setIsHovering(false);
        setIsTyping(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // If we are on a dashboard page, use the Figma-style cursor
  if (isDashboard && !isMobile) {
    return (
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-9999"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md"
        >
          <path
            d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
            fill="black"
            stroke="white"
          />
        </svg>
      </motion.div>
    );
  }

  if (isMobile) return null;

  // Cartoon Cursor - Arrow or Hand
  return (
    <>
      {/* Main Cartoon Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-9999"
        style={{
          translateX: cursorX,
          translateY: cursorY,
        }}
        animate={{
          scale: isHovering ? 1.1 : 1,
        }}
        transition={{
          scale: { duration: 0.15, ease: "easeOut" },
        }}
      >
        {isTyping ? (
          // I-Beam Cursor for Text Input
          <svg
            width="24"
            height="32"
            viewBox="0 0 24 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg"
          >
            {/* Black outline */}
            <path
              d="M6 4 L18 4 M12 4 L12 28 M6 28 L18 28"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Orange fill line */}
            <path
              d="M6 4 L18 4 M12 4 L12 28 M6 28 L18 28"
              stroke="#FF9600"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* White shine on vertical bar */}
            <line
              x1="13"
              y1="8"
              x2="13"
              y2="16"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.6"
            />
          </svg>
        ) : !isHovering ? (
          // Default Arrow Pointer
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg"
          >
            {/* Black outline */}
            <path
              d="M4 4 L4 22 L10 16 L14 24 L16 23 L12 15 L20 15 Z"
              fill="black"
              stroke="black"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Orange fill */}
            <path
              d="M5 5 L5 20 L10 15 L13.5 22 L15 21.5 L11.5 14.5 L19 14.5 Z"
              fill="#FF9600"
            />

            {/* White shine */}
            <path
              d="M7 7 L7 12 L9 10 Z"
              fill="white"
              fillOpacity="0.6"
            />
          </svg>
        ) : (
          // Hand Pointer for Hover
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg"
          >
            {/* Black outline (hand shape) */}
            <path
              d="M8 14 L8 8 C8 6.5 9 5.5 10 5.5 C11 5.5 12 6.5 12 8 L12 6 C12 4.5 13 3.5 14 3.5 C15 3.5 16 4.5 16 6 L16 5 C16 3.5 17 2.5 18 2.5 C19 2.5 20 3.5 20 5 L20 8 C20 8 20.5 7.5 21.5 7.5 C22.5 7.5 23.5 8.5 23.5 9.5 L23.5 15 C23.5 19 21 23 16 24 L12 24 C9 24 7 22 6 19 L6 16 C6 14.5 7 14 8 14 Z"
              fill="black"
              stroke="black"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Orange fill */}
            <path
              d="M9 14 L9 8.5 C9 7.5 9.5 7 10 7 C10.5 7 11 7.5 11 8.5 L11 7 C11 6 11.5 5.5 12 5.5 L14 5.5 C14.5 5.5 15 6 15 7 L15 6 C15 5 15.5 4.5 16 4.5 L18 4.5 C18.5 4.5 19 5 19 6 L19 8.5 C19 8.5 19.5 8.5 20.5 8.5 C21.5 8.5 22.5 9.5 22.5 10.5 L22.5 15 C22.5 18.5 20.5 22 16 23 L12.5 23 C10 23 8 21.5 7.5 19 L7.5 16.5 C7.5 15 8 14 9 14 Z"
              fill="#FF9600"
            />

            {/* Fingernail highlights */}
            <ellipse cx="10.5" cy="6" rx="1" ry="1.5" fill="white" fillOpacity="0.4" />
            <ellipse cx="14" cy="4.5" rx="1" ry="1.5" fill="white" fillOpacity="0.4" />
            <ellipse cx="18" cy="4" rx="1" ry="1.5" fill="white" fillOpacity="0.4" />
          </svg>
        )}
      </motion.div>

      {/* Subtle glow on hover or typing */}
      {(isHovering || isTyping) && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-9998"
          style={{
            translateX: cursorX,
            translateY: cursorY,
            x: -8,
            y: -8,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
        >
          <div className="w-12 h-12 bg-[#FF9600] rounded-full blur-xl" />
        </motion.div>
      )}
    </>
  );
};
