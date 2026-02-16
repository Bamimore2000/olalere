import { db } from "@/db";
import { collections } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { CollectionForm } from "../../components/CollectionForm";

interface EditCollectionPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditCollectionPage({ params }: EditCollectionPageProps) {
    const { id } = await params;

    const collection = await db.query.collections.findFirst({
        where: eq(collections.id, id),
    });

    if (!collection) {
        notFound();
    }

    return (
        <div className="max-w-5xl mx-auto">
            <CollectionForm initialData={collection} />
        </div>
    );
}
