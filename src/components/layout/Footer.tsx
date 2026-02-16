"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { subscribeToNewsletter } from "@/app/admin/actions";
import { CheckCircle, ArrowRight } from "lucide-react";

export function Footer() {
    const pathname = usePathname();
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    if (pathname?.startsWith("/admin")) return null;

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        try {
            const res = await subscribeToNewsletter(email);
            if (res.error) {
                setStatus("error");
                setMessage(res.error);
            } else {
                setStatus("success");
                setMessage("Welcome to out community.");
                setEmail("");
            }
        } catch (error) {
            setStatus("error");
            setMessage("Failed to subscribe.");
        }
    };

    return (
        <footer className="w-full border-t border-zinc-100 bg-white py-20 md:py-32">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">

                    {/* Brand Column */}
                    <div className="md:col-span-4 space-y-8">
                        <Link href="/" className="inline-block group">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 flex items-center justify-center rounded bg-zinc-900 text-white group-hover:scale-105 transition-transform">
                                    <span className="font-serif font-bold italic text-xl">B</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-serif text-2xl font-bold tracking-tighter text-zinc-900 leading-none">Borokini</span>
                                    <span className="text-[10px] font-bold tracking-[0.4em] text-zinc-400 uppercase leading-none mt-1">Luxury Jewelry</span>
                                </div>
                            </div>
                        </Link>
                        <p className="text-sm text-zinc-500 leading-relaxed font-medium max-w-sm">
                            Exquisite jewelry for the contemporary individual. We celebrate the intersection of heritage and modern design.
                        </p>
                    </div>

                    {/* Links Grid */}
                    <div className="md:col-span-4 grid grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] text-zinc-900">Explore</h4>
                            <ul className="space-y-4 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                                <li><Link href="/shop" className="hover:text-zinc-900 transition-colors">Shop All</Link></li>
                                <li><Link href="/editorials" className="hover:text-zinc-900 transition-colors">Stories</Link></li>
                                <li><Link href="/shop?collection=all" className="hover:text-zinc-900 transition-colors">Collections</Link></li>
                                <li><Link href="/about" className="hover:text-zinc-900 transition-colors">About Us</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] text-zinc-900">Customer Care</h4>
                            <ul className="space-y-4 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                                <li><Link href="/shipping" className="hover:text-zinc-900 transition-colors">Shipping & Returns</Link></li>
                                <li><Link href="/faq" className="hover:text-zinc-900 transition-colors">Help Center</Link></li>
                                <li><Link href="/contact" className="hover:text-zinc-900 transition-colors">Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter Column */}
                    <div className="md:col-span-4 space-y-8">
                        <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] text-zinc-900">Join the Newsletter</h4>
                        <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                            Subscribe for early access to new collections and exclusive brand stories.
                        </p>
                        <form onSubmit={handleSubscribe} className="space-y-4">
                            <div className="relative group">
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email address"
                                    className="h-14 bg-zinc-50 border-zinc-100 rounded-none focus:ring-zinc-900 focus:border-zinc-900 transition-all font-bold text-xs uppercase tracking-widest placeholder:text-zinc-300"
                                />
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center bg-zinc-900 text-white hover:bg-zinc-800 transition-all shadow-lg"
                                >
                                    {status === "loading" ? "..." : <ArrowRight className="h-4 w-4" />}
                                </button>
                            </div>
                            {status === "success" && (
                                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                                    <CheckCircle className="h-3 w-3" />
                                    {message}
                                </p>
                            )}
                            {status === "error" && (
                                <p className="text-[10px] font-bold uppercase tracking-widest text-red-400">
                                    {message}
                                </p>
                            )}
                        </form>
                    </div>
                </div>

                <div className="pt-12 border-t border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-8 text-[10px] font-bold text-zinc-300 uppercase tracking-[0.3em]">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <p>&copy; {new Date().getFullYear()} Borokini Jewelry. Elegant craftsmanship.</p>
                        <div className="flex gap-8">
                            <Link href="/privacy" className="hover:text-zinc-900 transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-zinc-900 transition-colors">Terms & Conditions</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
