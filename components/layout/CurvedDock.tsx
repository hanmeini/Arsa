"use client";

import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    BarChart3,
    Package,
    History,
    MessageSquare,
    LogOut,
    User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    MotionValue,
    AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Laporan", href: "/analytics", icon: BarChart3 },
    { name: "Inventory", href: "/inventory", icon: Package },
    { name: "Riwayat", href: "/sales-history", icon: History },
    { name: "Konsultasi", href: "/chat", icon: MessageSquare },
    { name: "Profil", href: "/profile", icon: User },
];

export function CurvedDock() {
    const pathname = usePathname();
    const mouseX = useMotionValue(Infinity);
    const [activeTab, setActiveTab] = useState(pathname);

    useEffect(() => {
        setActiveTab(pathname);
    }, [pathname]);

    const activeIndex = useMemo(() => {
        const index = navItems.findIndex((item) => item.href === activeTab);
        return index === -1 ? 0 : index;
    }, [activeTab]);

    const ITEM_WIDTH = 48;
    const GAP = 12;
    const PADDING_X = 32; // Wider padding
    const DOCK_HEIGHT = 60;

    const totalWidth =
        navItems.length * ITEM_WIDTH + (navItems.length - 1) * GAP + PADDING_X * 2;

    const activeItemCenter =
        PADDING_X +
        activeIndex * (ITEM_WIDTH + GAP) +
        ITEM_WIDTH / 2;

    return (
        <div className="fixed bottom-8 left-0 right-0 flex justify-center z-40 pointer-events-none">
            <div className="relative" style={{ width: totalWidth, height: DOCK_HEIGHT }}>
                <DockBackground
                    width={totalWidth}
                    height={DOCK_HEIGHT}
                    activeX={activeItemCenter}
                />

                <motion.div
                    className="absolute inset-0 flex items-center justify-between px-8 pointer-events-auto" // Matches PADDING_X (32px)
                    onMouseMove={(e) => mouseX.set(e.pageX)}
                    onMouseLeave={() => mouseX.set(Infinity)}
                >
                    {navItems.map((item) => (
                        <DockIcon
                            key={item.href}
                            item={item}
                            isActive={activeTab === item.href}
                        />
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

function DockBackground({
    width,
    height,
    activeX,
}: {
    width: number;
    height: number;
    activeX: number;
}) {
    const curveWidth = 96;
    const curveHeight = 16;

    const activeXMotion = useSpring(activeX, {
        stiffness: 220,
        damping: 25,
    });

    const getPath = (currentX: number) => {
        const r = 12;

        const hStart = currentX - curveWidth / 2;
        const hEnd = currentX + curveWidth / 2;

        const cpWidth = curveWidth * 0.28;

        return `
            M ${0 + r},0
            L ${hStart},0
            C ${hStart + cpWidth},0 ${currentX - cpWidth},-${curveHeight} ${currentX},-${curveHeight}
            C ${currentX + cpWidth},-${curveHeight} ${hEnd - cpWidth},0 ${hEnd},0
            L ${width - r},0
            Q ${width},0 ${width},${r}
            L ${width},${height - r}
            Q ${width},${height} ${width - r},${height}
            L ${r},${height}
            Q ${0},${height} ${0},${height - r}
            L ${0},${r}
            Q ${0},0 ${r},0
            Z
        `;
    };

    const [d, setD] = useState(() => getPath(activeX));

    useEffect(() => {
        activeXMotion.set(activeX);
        const unsubscribe = activeXMotion.on("change", (currentX) => {
            setD(getPath(currentX));
        });
        setD(getPath(activeXMotion.get()));
        return unsubscribe;
    }, [activeXMotion, activeX, width, height]);

    return (
        <svg
            width={width}
            height={height + curveHeight}
            viewBox={`0 -${curveHeight} ${width} ${height + curveHeight}`}
            className="absolute -top-[14px] left-0 z-0"
            style={{
                overflow: "visible",
                filter: "drop-shadow(0 15px 30px rgba(15, 76, 117, 0.3))"
            }}
        >
            <defs>
                <linearGradient id="dock-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
                </linearGradient>
            </defs>

            <motion.path
                d={d}
                fill="url(#dock-grad)"
                stroke="rgba(0,0,0,0.05)"
                strokeWidth="1"
            />
        </svg>
    );
}


function DockIcon({
    item,
    isActive,
}: {
    item: any;
    isActive: boolean;
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={item.href}>
            <div
                className="group relative flex flex-col items-center justify-center cursor-pointer"
                style={{ width: 48, height: 48 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div
                    className={cn(
                        "rounded-full flex items-center justify-center transition-colors duration-300 w-full h-full",
                        isActive
                            ? "bg-[#0F4C75] text-white shadow-lg shadow-[#0F4C75]/20"
                            : "bg-transparent text-slate-500 hover:text-[#0F4C75]"
                    )}
                    animate={{
                        y: isActive ? -10 : isHovered ? -4 : 0,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                    }}
                >
                    <div className="w-full h-full p-3 flex items-center justify-center">
                        <item.icon className="w-full h-full" strokeWidth={2} />
                    </div>
                </motion.div>

                <AnimatePresence>
                    {isHovered && !isActive && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="absolute -top-10 px-2 py-1 bg-[#0F4C75] text-white text-[10px] rounded-md shadow-xl whitespace-nowrap pointer-events-none"
                        >
                            {item.name}
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute -bottom-1 w-1 h-1 bg-[#FF9600] rounded-full"
                        />
                    )}
                </AnimatePresence>
            </div>
        </Link>
    );
}
