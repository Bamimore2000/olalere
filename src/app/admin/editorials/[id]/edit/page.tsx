import { db } from "@/db";
import { editorials } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { EditorialForm } from "../../components/EditorialForm";

interface EditEditorialPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditEditorialPage({ params }: EditEditorialPageProps) {
    const { id } = await params;

    const editorial = await db.query.editorials.findFirst({
        where: eq(editorials.id, id),
    });

    if (!editorial) {
        notFound();
    }

    return (
        <div className="max-w-5xl mx-auto">
            <EditorialForm initialData={editorial} />
        </div>
    );
}
