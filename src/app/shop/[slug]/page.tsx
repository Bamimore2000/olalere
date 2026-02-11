import { Suspense } from "react";
import { notFound } from "next/navigation";
import { mockProducts } from "@/lib/mock-data";
import { AddToCart } from "@/components/cart/add-to-cart";
import { Separator } from "@/components/ui/separator";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Generate Metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = mockProducts.find((p) => p.slug === slug);

    if (!product) {
        return {
            title: "Product Not Found | Borokini",
        };
    }

    return {
        title: `${product.name} | Borokini Luxury`,
        description: product.description,
        openGraph: {
            images: [product.images[0]],
        },
    };
}

// Product Details Component
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = mockProducts.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12 md:px-6 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                {/* Gallery Section */}
                <div className="space-y-4">
                    <div className="aspect-square relative overflow-hidden bg-secondary/20">
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>

                {/* Details Section */}
                <div className="flex flex-col space-y-8 sticky top-24 h-fit">
                    <div className="space-y-2">
                        <div className="flex flex-col gap-1">
                            <span className="text-sm uppercase tracking-widest text-muted-foreground">
                                {product.category}
                            </span>
                            {/* Collections & Tags Display */}
                            <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-wider text-muted-foreground/80">
                                {product.collections.map(c => <span key={c} className="border px-1.5 py-0.5">{c}</span>)}
                            </div>
                        </div>
                        <h1 className="font-serif text-3xl md:text-5xl font-medium tracking-tight">
                            {product.name}
                        </h1>
                        <p className="text-2xl font-medium text-foreground">
                            ${product.price.toFixed(2)}
                        </p>
                    </div>

                    <Separator />

                    <p className="text-muted-foreground leading-relaxed text-lg font-light">
                        {product.description}
                    </p>

                    <div className="space-y-4 pt-4">
                        <AddToCart product={{
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            quantity: 1
                        }} />
                        <p className="text-xs text-muted-foreground text-center w-[180px]">
                            Free shipping on all orders.
                        </p>
                    </div>

                    <div className="pt-8 w-full max-w-md">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-sm uppercase tracking-wider font-medium">Materials & Care</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    Crafted from premium {product.material}. To maintain its shine, gently wipe with a soft cloth and store in the provided jewelry box when not in use. Avoid contact with harsh chemicals or perfumes.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger className="text-sm uppercase tracking-wider font-medium">Shipping & Returns</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    We offer complimentary insured shipping on all orders. Returns are accepted within 30 days of delivery, provided the item is unworn and in its original packaging.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    );
}
