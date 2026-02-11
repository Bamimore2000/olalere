import Link from "next/link";
import { mockProducts } from "@/lib/mock-data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export const metadata = {
    title: "Collections | Borokini",
    description: "Browse our exclusive jewelry collections.",
};

export default function CollectionsPage() {
    // Extract unique collections and a representative image for each
    const collectionsMap = new Map<string, string>();

    mockProducts.forEach(product => {
        product.collections.forEach(collection => {
            if (!collectionsMap.has(collection)) {
                collectionsMap.set(collection, product.images[0]);
            }
        });
    });

    const collections = Array.from(collectionsMap.entries()).map(([name, image]) => ({
        name,
        image
    }));

    return (
        <div className="container mx-auto px-4 py-16 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                <h1 className="font-serif text-3xl md:text-5xl font-medium tracking-tight">
                    Our Collections
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-lg">
                    Curated sets for every occasion.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {collections.map((collection) => (
                    <Link key={collection.name} href={`/shop?collection=${encodeURIComponent(collection.name)}`} className="group">
                        <Card className="border-none shadow-none rounded-none overflow-hidden bg-transparent">
                            <CardContent className="p-0 relative aspect-[4/5] bg-secondary/20">
                                <div className="relative w-full h-full overflow-hidden">
                                    <img
                                        src={collection.image}
                                        alt={collection.name}
                                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
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
        </div>
    );
}
