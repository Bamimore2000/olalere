'use client';

import Link from "next/link";
import { Product } from "@/db/schema";
import NextImage from "next/image";
import { Button } from "@/components/ui/button";
import { AddToCart } from "@/components/cart/add-to-cart";
import { SafeImage } from "@/components/ui/safe-image";
import { ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface ProductCategorySectionProps {
    title: string;
    category: string;
    products: any[]; // Changed to any[] for demonstration if real DB products are not yet seeded
}

export function ProductCategorySection({ title, category, products }: ProductCategorySectionProps) {
    // Filter products by category if provided, otherwise show first few
    const displayProducts = category
        ? products.filter(p => p.category === category).slice(0, 4)
        : products.slice(0, 4);

    return (
        <section className="w-full py-4">
            <div className="bg-white rounded-sm shadow-sm border overflow-hidden">
                <div className="flex items-center justify-between px-2 py-1.5 border-b bg-zinc-50">
                    <h2 className="text-sm font-bold uppercase tracking-tight text-zinc-800">{title}</h2>
                    <Link
                        href={`/shop/${category || ''}`}
                        className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline"
                    >
                        SEE ALL <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 border-t">
                    {displayProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProductCard({ product }: { product: any }) {
    return (
        <div className="bg-white p-1.5 flex flex-col group relative border-r border-b last:border-r-0 lg:[&:nth-child(4)]:border-r-0 transition-all duration-300 hover:shadow-xl hover:z-10 text-zinc-900">
            <Link href={`/product/${product.slug || product.id}`} className="block aspect-square relative overflow-hidden mb-4 bg-zinc-50 rounded-sm">
                <SafeImage
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                />
                {product.stock < 5 && product.stock > 0 && (
                    <span className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm z-10">
                        LOW STOCK
                    </span>
                )}
            </Link>

            <div className="flex-1 space-y-0.5">
                <Link href={`/product/${product.slug || product.id}`} className="text-[13px] sm:text-sm font-medium line-clamp-1 hover:text-primary transition-colors text-black">
                    {product.name}
                </Link>
                <p className="text-base font-bold text-zinc-900 font-serif">
                    {formatPrice(product.price)}
                </p>
                <p className="text-[10px] text-zinc-400 line-through">
                    {formatPrice(Number(product.price) * 1.2)}
                </p>
            </div>

            <div className="mt-3">
                <AddToCart
                    product={{
                        ...product,
                        price: Number(product.price),
                        slug: product.slug || product.id
                    }}
                    className="w-full h-10 text-[10px] sm:text-xs py-0 uppercase"
                />
            </div>
        </div>
    );
}
