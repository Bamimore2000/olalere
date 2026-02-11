import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, or } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import { AddToCart } from "@/components/cart/add-to-cart";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ShieldCheck, Truck, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const product = await db.query.products.findFirst({
        where: or(
            eq(products.slug, id),
            // eq(products.id, id) // UUID lookup might fail if ID is not a valid UUID string
        ),
    });

    // If slug lookup fails, try UUID lookup but catch error if string is not a UUID
    let finalProduct = product;
    if (!finalProduct) {
        try {
            finalProduct = await db.query.products.findFirst({
                where: eq(products.id, id),
            });
        } catch (e) {
            // Not a valid UUID
        }
    }

    if (!finalProduct) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-zinc-50 pb-20">
            <div className="container mx-auto px-4 py-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-primary mb-8 group transition-colors"
                >
                    <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Gallery
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-6 sm:p-10 rounded-sm shadow-sm border border-zinc-100">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square relative overflow-hidden bg-zinc-50 rounded-sm border border-zinc-100 group">
                            <SafeImage
                                src={finalProduct.images[0]}
                                alt={finalProduct.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        {finalProduct.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {finalProduct.images.slice(1).map((img, i) => (
                                    <div key={i} className="aspect-square relative rounded-sm overflow-hidden border border-zinc-100">
                                        <Image src={img} alt="" fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="space-y-2 mb-6">
                            <Badge variant="outline" className="uppercase tracking-widest text-[10px] font-bold border-primary text-primary">
                                {finalProduct.category}
                            </Badge>
                            <h1 className="text-3xl md:text-4xl font-serif font-bold text-zinc-900 tracking-tight">
                                {finalProduct.name}
                            </h1>
                            <p className="text-2xl font-bold text-primary font-serif">
                                {formatPrice(Number(finalProduct.price))}
                            </p>
                        </div>

                        <div className="prose prose-zinc prose-sm mb-8 leading-relaxed text-zinc-600">
                            {finalProduct.description}
                        </div>

                        <div className="space-y-6 pt-6 border-t border-zinc-100">
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <AddToCart
                                        product={{
                                            id: finalProduct.id,
                                            name: finalProduct.name,
                                            price: Number(finalProduct.price),
                                            images: finalProduct.images,
                                            category: finalProduct.category,
                                            stock: finalProduct.stock
                                        }}
                                        className="w-full h-14 text-sm uppercase tracking-widest font-bold"
                                    />
                                </div>
                            </div>

                            <p className="text-[11px] text-zinc-400 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                Guaranteed 100% Authentic & Certified Luxury
                            </p>
                        </div>

                        {/* Perks Grid */}
                        <div className="grid grid-cols-2 gap-4 mt-12 pt-8 border-t border-zinc-100">
                            <div className="flex items-start gap-3 p-3 bg-zinc-50 rounded-sm">
                                <Truck className="w-5 h-5 text-zinc-900 mt-0.5" />
                                <div>
                                    <p className="text-xs font-bold text-zinc-900 uppercase tracking-wide">Free Delivery</p>
                                    <p className="text-[10px] text-zinc-500">Fast shipping in Nigeria</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-zinc-50 rounded-sm">
                                <RefreshCcw className="w-5 h-5 text-zinc-900 mt-0.5" />
                                <div>
                                    <p className="text-xs font-bold text-zinc-900 uppercase tracking-wide">Return Policy</p>
                                    <p className="text-[10px] text-zinc-500">30 days easy returns</p>
                                </div>
                            </div>
                        </div>

                        {/* Inventory Stats */}
                        <div className="mt-auto pt-8 flex items-center justify-between text-[11px] font-medium uppercase tracking-widest text-zinc-400">
                            <span>SKU: {finalProduct.slug.toUpperCase()}</span>
                            <span>Availability: {finalProduct.stock > 0 ? `${finalProduct.stock} in stock` : 'Out of Stock'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
