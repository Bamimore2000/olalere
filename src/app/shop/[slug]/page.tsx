import { db } from "@/db";
import { products as productsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

// Generate Metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

    return {
        title: `${categoryName} | Borokini Luxury`,
        description: `Explore our exclusive collection of ${slug}.`,
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const products = await db.select().from(productsTable).where(eq(productsTable.category, slug));

    if (products.length === 0) {
        // If no products found for this category, it might be an invalid category or just empty
        // For known categories, we might want to show an empty state, but for now notFound is fine if it's completely unknown
        const knownCategories = ['necklaces', 'rings', 'earrings', 'watches', 'gifts'];
        if (!knownCategories.includes(slug)) {
            notFound();
        }
    }

    const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

    return (
        <div className="container mx-auto px-4 py-16 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                <h1 className="font-serif text-3xl md:text-5xl font-medium tracking-tight">
                    {categoryName}
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-lg">
                    Exquisite {slug} curated for timeless elegance.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                    <Link key={product.id} href={`/product/${product.slug}`} className="group">
                        <Card className="border-none shadow-none rounded-none overflow-hidden bg-transparent">
                            <CardContent className="p-0 relative aspect-square bg-secondary/20">
                                <div className="relative w-full h-full overflow-hidden">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col items-start p-4 space-y-1">
                                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                                    {product.category}
                                </span>
                                <h3 className="font-serif text-lg font-medium group-hover:text-primary transition-colors">
                                    {product.name}
                                </h3>
                                <p className="text-sm font-medium text-foreground">
                                    {formatPrice(product.price)}
                                </p>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>

            {products.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-muted-foreground">No products found in this category.</p>
                    <Link href="/shop" className="text-primary hover:underline mt-4 inline-block">
                        Browse all collections
                    </Link>
                </div>
            )}
        </div>
    );
}
