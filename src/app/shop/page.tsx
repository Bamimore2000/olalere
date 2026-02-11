import Link from "next/link";
import Image from "next/image";
import { mockProducts } from "@/lib/mock-data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Shop All | Borokini",
    description: "Explore our complete collection of luxury jewelry.",
};

export default function ShopPage() {
    return (
        <div className="container mx-auto px-4 py-16 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                <h1 className="font-serif text-3xl md:text-5xl font-medium tracking-tight">
                    The Collection
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-lg">
                    Handpicked pieces that define elegance and sophistication.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {mockProducts.map((product) => (
                    <Link key={product.id} href={`/shop/${product.slug}`} className="group">
                        <Card className="border-none shadow-none rounded-none overflow-hidden bg-transparent">
                            <CardContent className="p-0 relative aspect-square bg-secondary/20">
                                {/* Image Container with Hover Effect */}
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
                                    ${product.price.toFixed(2)}
                                </p>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
