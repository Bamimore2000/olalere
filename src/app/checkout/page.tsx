"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft, Lock, ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
    const { items } = useCart();
    const totalPrice = items.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
                <ShoppingBag className="w-16 h-16 text-zinc-200 mb-4" />
                <h1 className="font-serif text-2xl mb-4">Your cart is empty</h1>
                <Link href="/shop">
                    <Button>Return to Shop</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-zinc-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="flex items-center gap-2 mb-8 border-b pb-4">
                    <Link href="/shop" className="text-zinc-500 hover:text-primary transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="font-serif text-3xl font-bold tracking-tight">Checkout</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <section className="bg-white p-6 rounded-sm shadow-sm border">
                            <h2 className="font-serif text-xl mb-6 uppercase tracking-widest border-b pb-2">Order Summary</h2>
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-zinc-100 last:border-0">
                                        <div className="flex gap-4 items-center">
                                            <div className="w-12 h-12 bg-zinc-100 rounded-sm overflow-hidden relative border text-[8px] flex items-center justify-center text-zinc-400">
                                                {item.name[0]}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{item.name}</p>
                                                <p className="text-xs text-zinc-400">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm font-serif">{formatPrice(item.price * item.quantity)}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="flex items-center gap-2 text-zinc-400 text-xs justify-center italic">
                            <Lock className="w-3 h-3" />
                            Secure SSL Encrypted Checkout
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-sm shadow-sm border sticky top-24">
                            <h2 className="font-serif text-xl mb-6 uppercase tracking-widest">Pricing</h2>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-zinc-500">Subtotal</span>
                                    <span>{formatPrice(totalPrice)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-zinc-500">Shipping</span>
                                    <span className="text-green-600 font-medium tracking-tight">FREE</span>
                                </div>
                                <div className="border-t pt-4 mt-4 flex justify-between font-serif text-xl font-bold">
                                    <span className="uppercase">Total</span>
                                    <span className="text-primary">{formatPrice(totalPrice)}</span>
                                </div>
                            </div>

                            <Button
                                className="w-full mt-8 h-14 uppercase tracking-[0.2em] font-bold text-sm"
                                onClick={() => alert("This feature is currently under final touches. Borokini Luxury values your interest.")}
                            >
                                Complete Purchase
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
