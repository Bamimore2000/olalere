import Link from "next/link";
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";
import { ProductTable } from "./components/ProductTable";

export default async function ProductsPage() {
    const allProducts = await db.query.products.findMany({
        orderBy: [desc(products.createdAt)],
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-8">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-900 font-serif">Inventory Archive</h1>
                    <p className="text-zinc-500 mt-2 font-medium">Archival record management & stock preservation.</p>
                </div>
                <Button className="gap-2 shadow-sm font-bold uppercase tracking-widest text-[10px] h-11" asChild>
                    <Link href="/admin/products/new">
                        <Plus className="h-4 w-4" />
                        Create New Record
                    </Link>
                </Button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4 py-8 border-b border-zinc-100">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <Input placeholder="Search records..." className="pl-9 border-zinc-200 h-10 shadow-none focus:ring-zinc-900" />
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2 border-zinc-200 text-zinc-600 font-bold uppercase tracking-widest text-[10px] h-10">
                        <Filter className="h-4 w-4" />
                        Sort Filters
                    </Button>
                </div>
            </div>

            <ProductTable products={allProducts} />
        </div>
    );
}
