"use client";

import Link from "next/link";
import { Search, User, Menu, Zap, Flame, Gem, Diamond, Circle, Watch, Gift, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { CartSheet } from "@/components/cart/cart-sheet";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";

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

const mobileMenuVariants: Variants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: 0.05,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -25, scale: 0.98 },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

export function Header() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    if (pathname?.startsWith("/admin")) return null;

    return (
        <header className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-zinc-200">
            {/* Jumia-style top stripe */}
            <div className="h-1 w-full bg-primary" />
            <div className="container mx-auto flex items-center justify-between px-4 md:px-6 py-2.5">

                {/* Mobile Menu */}
                <div className="flex items-center md:hidden">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="mr-2">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white border-r p-0 overflow-y-auto">
                            <div className="flex flex-col h-full">
                                <div className="p-6 border-b">
                                    <Link
                                        href="/"
                                        className="font-serif text-2xl font-bold tracking-widest text-primary"
                                        onClick={() => setOpen(false)}
                                    >
                                        BOROKINI
                                    </Link>
                                </div>

                                <motion.nav
                                    className="flex flex-col gap-1 p-4"
                                    variants={mobileMenuVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <p className="px-4 text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-2">Categories</p>
                                    {categories.map((category) => (
                                        <motion.div key={category.name} variants={itemVariants}>
                                            <Link
                                                href={category.href}
                                                className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-secondary/50 hover:text-primary transition-colors rounded-md group"
                                                onClick={() => setOpen(false)}
                                            >
                                                <category.icon className="w-4 h-4 text-zinc-400 group-hover:text-primary" />
                                                {category.name}
                                            </Link>
                                        </motion.div>
                                    ))}

                                    <motion.div variants={itemVariants} className="mt-2 border-t pt-2">
                                        <Link
                                            href="/collections"
                                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-secondary/50 hover:text-primary transition-colors rounded-md group"
                                            onClick={() => setOpen(false)}
                                        >
                                            <Zap className="w-4 h-4 text-zinc-400 group-hover:text-primary" />
                                            Browse Collections
                                        </Link>
                                    </motion.div>

                                    <div className="my-4 border-t pt-4">
                                        <p className="px-4 text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-2">Account</p>
                                        <motion.div variants={itemVariants}>
                                            <Link
                                                href="/sign-in"
                                                className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-secondary/50 rounded-md"
                                                onClick={() => setOpen(false)}
                                            >
                                                <User className="w-4 h-4 text-zinc-400" />
                                                Log In / Sign Up
                                            </Link>
                                        </motion.div>
                                    </div>
                                </motion.nav>

                                <div className="mt-auto p-4 bg-zinc-50 border-t">
                                    <p className="text-[11px] text-zinc-500 text-center">
                                        &copy; 2026 Borokini Jewelry. All rights reserved.
                                    </p>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Logo */}
                <div className="flex items-center md:mr-8">
                    <Link href="/" className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/logo.svg"
                            alt="Borokini Luxury Jewelry"
                            className="h-10 w-auto"
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold mx-6 uppercase tracking-[0.2em] text-zinc-400">
                    <Link href="/shop" className="hover:text-zinc-900 transition-colors">
                        Shop All
                    </Link>
                    <Link href="/editorials" className="hover:text-zinc-900 transition-colors">
                        Stories
                    </Link>
                    <Link href="/collections" className="hover:text-zinc-900 transition-colors">
                        Collections
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Search className="h-5 w-5" />
                        <span className="sr-only">Search</span>
                    </Button>

                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/sign-in">
                            <User className="h-5 w-5" />
                            <span className="sr-only">Account</span>
                        </Link>
                    </Button>

                    <CartSheet />
                </div>
            </div>
        </header>
    );
}
