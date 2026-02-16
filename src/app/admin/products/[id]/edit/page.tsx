import { ProductForm } from "../../components/ProductForm";
import { db } from "@/db";
import { products, collections as collectionsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

interface EditProductPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
    const { id } = await params;

    const product = await db.query.products.findFirst({
        where: eq(products.id, id),
    });

    const collections = await db.select().from(collectionsTable);

    if (!product) {
        notFound();
    }

    return (
        <div className="max-w-5xl mx-auto">
            <ProductForm initialData={product} collections={collections} />
        </div>
    );
}
