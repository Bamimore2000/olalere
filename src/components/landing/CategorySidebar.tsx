'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Gem,
    Diamond,
    Watch,
    Circle,
    Zap,
    Gift,
    Clock,
    Flame
} from "lucide-react";

const sidebarVariants = {
    hidden: {
        opacity: 0,
        x: -120,
        filter: "blur(4px)"
    },
    visible: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1]
        }
    }
};

const categories = [
    { name: "Daily Deals", icon: Zap, href: "/shop?sort=deals" },
    { name: "Trending Now", icon: Flame, href: "/shop?sort=trending" },
    { name: "Necklaces", icon: Gem, href: "/shop/necklaces" },
    { name: "Rings", icon: Diamond, href: "/shop/rings" },
    { name: "Earrings", icon: Circle, href: "/shop/earrings" },
    { name: "Watches", icon: Watch, href: "/shop/watches" },
    { name: "Gift Sets", icon: Gift, href: "/shop/gifts" },
    { name: "New Arrivals", icon: Clock, href: "/shop?sort=new" },
];

export function CategorySidebar() {
    return (
        <motion.aside
            className="hidden lg:block w-64 shrink-0 bg-white border rounded-sm overflow-hidden shadow-sm self-start"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex flex-col py-2">
                {categories.map((category) => (
                    <motion.div key={category.name} variants={itemVariants}>
                        <Link
                            href={category.href}
                            className="flex items-center gap-2 px-3 py-2.5 text-xs hover:bg-secondary/50 hover:text-primary transition-colors group"
                        >
                            <category.icon className="w-4 h-4 text-zinc-400 group-hover:text-primary transition-transform duration-300 group-hover:scale-110" />
                            <span className="font-medium text-zinc-700 group-hover:text-primary">{category.name}</span>
                        </Link>
                    </motion.div>
                ))}
            </div>
            <div className="p-3 border-t bg-zinc-50">
                <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-2">Exclusive Benefits</p>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-zinc-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Free Shipping
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-zinc-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Secure Checkout
                    </div>
                </div>
            </div>
        </motion.aside>
    );
}
