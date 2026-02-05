"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { GlowCursor } from "@/components/ui/GlowCursor";

interface AuthLayoutProps {
    children: React.ReactNode;
    title: React.ReactNode;
    subtitle: string;
    reverse?: boolean;
}

export function AuthLayout({ children, title, subtitle, reverse = false }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex bg-[#F0F9FF] overflow-hidden font-sans selection:bg-orange-100">
            {/* Brand Panel (Blue Side) */}
            <div
                className={cn(
                    "hidden lg:flex lg:w-1/2 relative flex-col justify-center px-16 bg-[#005587] text-white overflow-hidden order-1",
                    reverse ? "lg:order-2" : "lg:order-1"
                )}
            >
                <GlowCursor />
                {/* Decorative Elements (Static) */}
                <div className="absolute top-0 left-0">
                    <Image src="/icons/dekor-login.svg" alt="dekor" width={232} height={143} />
                </div>

                <div className="absolute bottom-0 right-0 origin-center">
                    <Image
                        src="/icons/dekor-login.svg"
                        alt="dekor"
                        width={232}
                        height={143}
                        className="rotate-180"
                    />
                </div>

                <div className="absolute right-10 top-10">
                    <Image src="/icons/meteocons_star.svg" alt="star" width={80} height={80} />
                </div>

                <div className="absolute left-20 bottom-10">
                    <Image src="/icons/stars2.svg" alt="star" width={80} height={80} />
                </div>

                {/* Dashed Circle */}
                <div className="absolute top-10 left-10">
                    <div className="w-20 h-20 border border-dashed border-orange-400/30 rounded-full opacity-50" />
                </div>

                {/* Small Orange Star */}
                <div className="absolute bottom-10 right-10">
                    <Image
                        src="/icons/mage_stars-b.svg"
                        alt="star"
                        width={40}
                        height={40}
                        className="text-orange-400"
                    />
                </div>

                {/* Content */}
                <div className="relative z-0 max-w-lg">
                    {/* Logo */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3">
                            <Image
                                src="/icons/logo-login.svg"
                                alt="Arsa Logo"
                                width={40}
                                height={40}
                                className="w-12 h-12"
                            />
                        </div>
                    </div>

                    <h1 className="text-5xl font-bold leading-tight mb-6">
                        {title}
                    </h1>

                    <p className="text-lg text-blue-100/80 leading-relaxed max-w-md">
                        {subtitle}
                    </p>

                    {/* Stylized connector lines */}
                    <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] border border-orange-500/20 rounded-full opacity-30 pointer-events-none" />
                </div>

                {/* Gradient Overlay for bottom decorations */}
                <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-[#005587] to-transparent z-20 pointer-events-none" />
            </div>

            {/* Form Panel (White/Light Side) */}
            <div
                className={cn(
                    "w-full lg:w-1/2 flex items-center justify-center relative p-6 order-2 perspective-[1000px]",
                    reverse ? "lg:order-1" : "lg:order-2"
                )}
            >
                {/* Subtle Background Pattern */}
                <div
                    className="absolute inset-0 z-0 opacity-40 pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }}
                />

                <div className="w-full max-w-[420px] relative z-10 mx-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
