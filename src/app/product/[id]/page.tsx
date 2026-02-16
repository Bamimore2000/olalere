import { db } from "@/db";
import { products, collections } from "@/db/schema";
import { eq, or } from "drizzle-orm";
import { notFound } from "next/navigation";
import ProductDetailsClient from "./components/ProductDetailsClient";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const product = await db.query.products.findFirst({
        where: or(eq(products.slug, id), eq(products.id, id))
    });

    if (!product) return { title: "Product Not Found" };

    return {
        title: `${product.name} | Borokini Luxury`,
        description: product.description.substring(0, 160),
        openGraph: {
            title: product.name,
            description: product.description.substring(0, 160),
            images: product.images.map(img => ({ url: img })),
        }
    };
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const product = await db.query.products.findFirst({
        where: or(
            eq(products.slug, id),
        ),
    });

    // If slug lookup fails, try UUID lookup 
    let finalProduct = product;
    if (!finalProduct) {
        try {
            finalProduct = await db.query.products.findFirst({
                where: eq(products.id, id),
            });
        } catch (e) { }
    }

    if (!finalProduct) {
        notFound();
    }

    let collectionName = null;
    if (finalProduct.collectionId) {
        const collection = await db.query.collections.findFirst({
            where: eq(collections.id, finalProduct.collectionId),
        });
        collectionName = collection?.name;
    }

    return <ProductDetailsClient product={finalProduct} collectionName={collectionName} />;
}
