import { db } from "@/db";
import { products, collections } from "@/db/schema";
import { eq, or } from "drizzle-orm";
import { notFound } from "next/navigation";
import ProductDetailsClient from "./components/ProductDetailsClient";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    // Try slug lookup first
    let product = await db.query.products.findFirst({
        where: eq(products.slug, id)
    });

    // Fallback to ID lookup only if id looks like a UUID
    if (!product && id.length === 36) {
        try {
            product = await db.query.products.findFirst({
                where: eq(products.id, id)
            });
        } catch (e) {
            // Ignore UUID format errors
        }
    }

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

    // Try slug lookup
    let finalProduct = await db.query.products.findFirst({
        where: eq(products.slug, id),
    });

    // Fallback to ID lookup only if id looks like a UUID
    if (!finalProduct && id.length === 36) {
        try {
            finalProduct = await db.query.products.findFirst({
                where: eq(products.id, id),
            });
        } catch (e) {
            // Ignore UUID format errors
        }
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
