import Link from "next/link";
import { db } from "@/db";
import { products as productsTable } from "@/db/schema";
import { Card, CardContent } from "@/components/ui/card";
import { SafeImage } from "@/components/ui/safe-image";

export const metadata = {
    title: "Collections | Borokini Luxury",
    description: "Browse our exclusive jewelry collections.",
};

export default async function CollectionsPage() {
    // Fetch all collections
    const allCollections = await db.query.collections.findMany();

    // Fetch all products to find representative images
    const allProducts = await db.query.products.findMany();

    const collectionsWithImages = allCollections.map(collection => {
        // Find a product in this collection
        const representativeProduct = allProducts.find(p => p.collectionId === collection.id);

        return {
            name: collection.name,
            slug: collection.slug,
            image: representativeProduct?.images[0] || "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2000&auto=format&fit=crop"
        };
    });

    const collections = collectionsWithImages;

    return (
        <div className="container mx-auto px-4 py-16 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                <h1 className="font-serif text-3xl md:text-5xl font-medium tracking-tight">
                    Our Collections
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-lg">
                    Curated sets for every occasion, defined by heritage and craft.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {collections.map((collection) => (
                    <Link key={collection.slug} href={`/shop?collection=${collection.slug}`} className="group">
                        <Card className="border-none shadow-none rounded-none overflow-hidden bg-transparent">
                            <CardContent className="p-0 relative aspect-[4/5] bg-secondary/20">
                                <div className="relative w-full h-full overflow-hidden">
                                    <SafeImage
                                        src={collection.image}
                                        alt={collection.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <h3 className="font-serif text-2xl md:text-3xl font-medium text-white tracking-widest uppercase border-y border-white/50 py-2 px-6 backdrop-blur-sm">
                                            {collection.name}
                                        </h3>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
            {collections.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-zinc-500 italic">Our exclusive collections are currently being curated. Check back soon.</p>
                </div>
            )}
        </div>
    );
}
