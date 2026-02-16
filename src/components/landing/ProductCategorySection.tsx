'use client';

import Link from "next/link";
import { Product } from "@/db/schema";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { AddToCart } from "@/components/cart/add-to-cart";
import { SafeImage } from "@/components/ui/safe-image";

interface ProductCategorySectionProps {
    title: string;
    category: string;
    products: any[];
}

export function ProductCategorySection({ title, category, products }: ProductCategorySectionProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        slidesToScroll: 1,
        breakpoints: {
            '(min-width: 768px)': { slidesToScroll: 2 },
            '(min-width: 1024px)': { slidesToScroll: 4 }
        }
    });

    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setPrevBtnEnabled(emblaApi.canScrollPrev());
        setNextBtnEnabled(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    const displayProducts = category
        ? products.filter(p => p.category === category)
        : products;

    return (
        <section className="w-full py-6">
            <div className="bg-white rounded-none border border-zinc-100 overflow-hidden group/section">
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-50 bg-white">
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-900">{title}</h2>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={scrollPrev}
                                disabled={!prevBtnEnabled}
                                className="p-1 text-zinc-300 hover:text-zinc-900 disabled:opacity-20 transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={scrollNext}
                                disabled={!nextBtnEnabled}
                                className="p-1 text-zinc-300 hover:text-zinc-900 disabled:opacity-20 transition-colors"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                        <Link
                            href={`/shop?category=${category || ''}`}
                            className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors border-l border-zinc-100 pl-6"
                        >
                            View All
                        </Link>
                    </div>
                </div>

                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {displayProducts.map((product) => (
                            <div key={product.id} className="flex-[0_0_80%] min-w-0 sm:flex-[0_0_40%] lg:flex-[0_0_25%]">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function ProductCard({ product }: { product: any }) {
    return (
        <div className="bg-white p-4 flex flex-col group relative border-r border-zinc-50 last:border-r-0 transition-all duration-300 hover:bg-zinc-50/50 h-full">
            <Link href={`/product/${product.slug || product.id}`} className="block aspect-[4/5] relative overflow-hidden mb-6 bg-zinc-50">
                <SafeImage
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 80vw, (max-width: 1024px) 40vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {product.stock < 5 && product.stock > 0 && (
                    <span className="absolute top-4 left-4 bg-zinc-900 text-white text-[9px] font-bold px-2 py-1 tracking-widest uppercase">
                        Low Stock
                    </span>
                )}
            </Link>

            <div className="flex-1 space-y-2">
                <Link href={`/product/${product.slug || product.id}`} className="block">
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-zinc-900 transition-colors duration-300 line-clamp-1">
                        {product.name}
                    </h3>
                </Link>
                <div className="flex items-baseline gap-3">
                    <span className="text-sm font-bold text-zinc-900 uppercase tracking-tighter">
                        {formatPrice(product.price)}
                    </span>
                    <span className="text-[10px] text-zinc-300 line-through tracking-tighter">
                        {formatPrice(Number(product.price) * 1.2)}
                    </span>
                </div>
            </div>

            <div className="mt-6 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <AddToCart
                    product={{
                        ...product,
                        price: Number(product.price),
                        slug: product.slug || product.id,
                        selectedSize: "ONE SIZE" // Default for quick add from landing
                    }}
                    className="w-full h-12 text-[10px] font-bold uppercase tracking-[0.2em] bg-zinc-900 hover:bg-black text-white rounded-none border-none"
                />
            </div>
        </div>
    );
}
