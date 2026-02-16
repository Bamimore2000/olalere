"use client";

import { useTransition } from "react";
import { deleteProduct } from "@/app/admin/actions";
import { Trash2 } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function DeleteProductButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this product?")) {
            startTransition(async () => {
                await deleteProduct(id);
                router.refresh();
            });
        }
    };

    return (
        <DropdownMenuItem
            className="text-destructive focus:text-destructive flex items-center gap-2 cursor-pointer"
            onClick={handleDelete}
            disabled={isPending}
        >
            <Trash2 className="h-4 w-4" />
            {isPending ? "Deleting..." : "Delete"}
        </DropdownMenuItem>
    );
}
