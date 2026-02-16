"use client";

import { db } from "@/db";
import { products, collections } from "@/db/schema";
import { eq, or } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import { AddToCart } from "@/components/cart/add-to-cart";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ShieldCheck, Truck, RefreshCcw, Box, Info } from "lucide-react";
import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export default function ProductDetailsClient({
    product,
    collectionName
}: {
    product: any,
    collectionName?: string | null
}) {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const sizeStock = (product.sizeStock as Record<string, number>) || {};
    const availableSizes = Object.entries(sizeStock)
        .filter(([_, stock]) => stock > 0)
        .map(([size]) => size);

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
                <div className="flex items-center justify-between mb-12">
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 transition-colors"
                    >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        Back to Shop
                    </Link>
                    {collectionName && (
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Collection:</span>
                            <span className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest underline decoration-zinc-200 underline-offset-4">{collectionName}</span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Image Gallery */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="aspect-[4/5] relative bg-zinc-50 overflow-hidden group border border-zinc-100">
                            <SafeImage
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                priority
                            />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {product.images.map((img: string, i: number) => (
                                <div key={i} className="aspect-square relative bg-zinc-50 border border-zinc-100 overflow-hidden cursor-pointer hover:border-zinc-900 transition-colors">
                                    <Image src={img} alt="" fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="lg:col-span-5 flex flex-col pt-4">
                        <div className="space-y-6 pb-8 border-b border-zinc-100">
                            <div>
                                <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.3em] mb-3">{product.category}</p>
                                <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 tracking-tighter leading-none mb-4">
                                    {product.name}
                                </h1>
                                <div className="flex items-center gap-4">
                                    <span className="text-3xl font-bold text-zinc-900 font-serif">
                                        {formatPrice(Number(product.price))}
                                    </span>
                                    {product.compareAtPrice && (
                                        <span className="text-xl text-zinc-400 line-through font-serif">
                                            {formatPrice(Number(product.compareAtPrice))}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="prose prose-zinc prose-sm leading-relaxed text-zinc-600 font-medium">
                                {product.description}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="py-8 space-y-6">
                            <div className="flex items-center justify-between">
                                <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Select Size</Label>
                                <button className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 underline decoration-zinc-100 underline-offset-4 flex items-center gap-1.5">
                                    <Info className="h-3 w-3" />
                                    Size Guide
                                </button>
                            </div>
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => {
                                    const stock = sizeStock[size] || 0;
                                    const isAvailable = stock > 0;
                                    const isActive = selectedSize === size;

                                    return (
                                        <button
                                            key={size}
                                            disabled={!isAvailable}
                                            onClick={() => setSelectedSize(size)}
                                            className={cn(
                                                "h-12 flex flex-col items-center justify-center border text-[10px] font-bold uppercase tracking-widest transition-all",
                                                isActive
                                                    ? "bg-zinc-900 text-white border-zinc-900 shadow-md"
                                                    : isAvailable
                                                        ? "bg-white text-zinc-900 border-zinc-200 hover:border-zinc-900"
                                                        : "bg-zinc-50 text-zinc-300 border-zinc-100 cursor-not-allowed opacity-50 strike-through"
                                            )}
                                        >
                                            {size}
                                            <span className={cn(
                                                "text-[8px] mt-0.5 opacity-60",
                                                isActive ? "text-white/60" : "text-zinc-400"
                                            )}>
                                                {isAvailable ? `${stock} Left` : 'Sold Out'}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <div className="space-y-6">
                            <AddToCart
                                product={{
                                    id: product.id,
                                    name: product.name,
                                    price: Number(product.price),
                                    images: product.images,
                                    category: product.category,
                                    stock: product.stock,
                                    selectedSize: selectedSize || undefined,
                                    slug: product.slug
                                }}
                                disabled={!selectedSize}
                                className="w-full h-16 text-[10px] uppercase tracking-[0.3em] font-bold bg-zinc-900 text-white hover:bg-zinc-800 transition-all rounded-none"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6 border-y border-zinc-100">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-zinc-50 flex items-center justify-center border border-zinc-100">
                                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-zinc-900 uppercase">Quality Guaranteed</p>
                                        <p className="text-[9px] text-zinc-400 font-medium">100% Authentic Luxury</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-zinc-50 flex items-center justify-center border border-zinc-100">
                                        <Truck className="h-4 w-4 text-zinc-900" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-zinc-900 uppercase">Fast Delivery</p>
                                        <p className="text-[9px] text-zinc-400 font-medium">Global Express Shipping</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-300">
                            <span>REF: {product.sku || product.id.substring(0, 8)}</span>
                            <span>ID: {product.slug.toUpperCase()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
