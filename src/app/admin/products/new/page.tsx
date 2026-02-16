import { ProductForm } from "../components/ProductForm";

import { db } from "@/db";
import { collections as collectionsTable } from "@/db/schema";

export default async function NewProductPage() {
    const collections = await db.select().from(collectionsTable);

    return (
        <div className="max-w-5xl mx-auto">
            <ProductForm collections={collections} />
        </div>
    );
}
