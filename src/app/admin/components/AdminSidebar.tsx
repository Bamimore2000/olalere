"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Users,
    Settings,
    ArrowLeft,
    ChevronRight,
    Truck,
    BookOpen,
    Mail,
    Plus,
    Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";

const sidebarVariants: Variants = {
    hidden: { opacity: 0, x: -100, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: {
            type: "spring",
            damping: 25,
            stiffness: 120,
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: {
            type: "spring",
            damping: 20,
            stiffness: 100
        }
    }
};

const menuItems = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
        subtitle: "Overview & Metrics"
    },
    {
        title: "Products",
        href: "/admin/products",
        icon: Package,
        subtitle: "Inventory Management"
    },
    {
        title: "Orders",
        href: "/admin/orders",
        icon: ShoppingBag,
        subtitle: "Order Fulfillment"
    },
    {
        title: "Collections",
        href: "/admin/collections",
        icon: Layers,
        subtitle: "Product Grouping"
    },
    {
        title: "Stories",
        href: "/admin/editorials",
        icon: BookOpen,
        subtitle: "Blog & Narratives"
    },
    {
        title: "Subscribers",
        href: "/admin/newsletter",
        icon: Mail,
        subtitle: "Newsletter List"
    },
];

import { useState, useEffect } from "react";

export function AdminSidebar() {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return <div className="flex flex-col h-full bg-zinc-50 border-r border-zinc-200 w-72" />;

    return (
        <motion.div
            className="flex flex-col h-full bg-white border-r border-zinc-200 w-72"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="p-8 border-b border-zinc-100 bg-zinc-50/50">
                <Link href="/" className="group flex items-center gap-3">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-zinc-900 text-white shadow-lg transition-transform group-hover:scale-105">
                        <span className="font-serif font-bold italic text-xl">B</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-serif text-xl font-bold tracking-tighter text-zinc-900">Admin</span>
                        <span className="text-[10px] font-bold tracking-[0.3em] text-zinc-400 uppercase leading-none mt-1">Store Dashboard</span>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 px-4 py-8 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                    return (
                        <motion.div key={item.href} variants={itemVariants}>
                            <Link
                                href={item.href}
                                className={cn(
                                    "flex items-center justify-between px-4 py-3 text-sm font-medium transition-all group rounded-xl",
                                    isActive
                                        ? "bg-zinc-900 text-white shadow-xl shadow-zinc-200/50"
                                        : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className={cn(
                                        "h-5 w-5 transition-colors",
                                        isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-900"
                                    )} />
                                    <div className="flex flex-col">
                                        <span className="font-bold tracking-tight">{item.title}</span>
                                        <span className={cn(
                                            "text-[9px] uppercase tracking-widest font-bold opacity-60",
                                            isActive ? "text-white" : "text-zinc-400"
                                        )}>{item.subtitle}</span>
                                    </div>
                                </div>
                                {isActive && <ChevronRight className="h-4 w-4" />}
                            </Link>
                        </motion.div>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-zinc-100">
                <Button variant="ghost" size="sm" asChild className="w-full justify-start text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 rounded-xl group">
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Exit Admin</span>
                    </Link>
                </Button>
            </div>
        </motion.div>
    );
}
