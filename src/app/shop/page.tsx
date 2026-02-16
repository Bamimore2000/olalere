import Link from "next/link";
import { db } from "@/db";
import { products as productsTable, collections } from "@/db/schema";
import { formatPrice } from "@/lib/utils";
import { SafeImage } from "@/components/ui/safe-image";
import { eq } from "drizzle-orm";
import { cn } from "@/lib/utils";

export const metadata = {
    title: "Shop All | Borokini",
    description: "Explore our complete collection of luxury jewelry.",
};

export default async function ShopPage({
    searchParams
}: {
    searchParams: Promise<{ collection?: string }>
}) {
    const { collection: collectionSlug } = await searchParams;

    let activeCollectionId: string | null = null;
    if (collectionSlug && collectionSlug !== 'all') {
        const found = await db.query.collections.findFirst({
            where: eq(collections.slug, collectionSlug)
        });
        activeCollectionId = found?.id || null;
    }

    const allProducts = await db.query.products.findMany({
        where: activeCollectionId ? eq(productsTable.collectionId, activeCollectionId) : undefined,
    });

    const allCollections = await db.query.collections.findMany();

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-[1400px] mx-auto px-4 py-20 md:px-8">
                <div className="flex flex-col items-center justify-center space-y-6 text-center mb-24">
                    <div className="flex items-center gap-3">
                        <div className="h-px w-8 bg-zinc-200" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400">Our Collection</span>
                        <div className="h-px w-8 bg-zinc-200" />
                    </div>
                    <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tighter text-zinc-900 leading-none">
                        Shop All
                    </h1>
                    <p className="max-w-[600px] text-zinc-500 font-medium leading-relaxed">
                        Handpicked pieces that define elegance and sophistication. Filter by collection or browse our entire gallery.
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-16 border-y border-zinc-100 py-6">
                    <Link
                        href="/shop"
                        className={cn(
                            "px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
                            (!collectionSlug || collectionSlug === 'all') ? "bg-zinc-900 text-white shadow-lg" : "text-zinc-400 hover:text-zinc-900"
                        )}
                    >
                        Browse All
                    </Link>
                    {allCollections.map((col) => (
                        <Link
                            key={col.id}
                            href={`/shop?collection=${col.slug}`}
                            className={cn(
                                "px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
                                collectionSlug === col.slug ? "bg-zinc-900 text-white shadow-lg" : "text-zinc-400 hover:text-zinc-900"
                            )}
                        >
                            {col.name}
                        </Link>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                    {allProducts.map((product) => (
                        <Link key={product.id} href={`/product/${product.slug}`} className="group block">
                            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-50 border border-zinc-100">
                                <SafeImage
                                    src={product.images[0]}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                {product.stock === 0 && (
                                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                                        <span className="px-4 py-2 border border-zinc-900 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-900">
                                            Sold Out
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="mt-6 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                                        {product.category}
                                    </span>
                                    {product.compareAtPrice && (
                                        <span className="text-[9px] font-bold text-zinc-300 line-through uppercase tracking-widest">
                                            {formatPrice(Number(product.compareAtPrice))}
                                        </span>
                                    )}
                                </div>
                                <h3 className="font-serif text-xl font-bold text-zinc-900 group-hover:underline decoration-zinc-200 underline-offset-8">
                                    {product.name}
                                </h3>
                                <p className="text-sm font-bold text-zinc-900 font-serif">
                                    {formatPrice(Number(product.price))}
                                </p>
                            </div>
                        </Link>
                    ))}
                    {allProducts.length === 0 && (
                        <div className="col-span-full py-32 text-center">
                            <p className="text-zinc-400 font-bold uppercase tracking-[0.2em]">No products found in this collection.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
