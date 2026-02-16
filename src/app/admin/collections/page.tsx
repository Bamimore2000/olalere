import { db } from "@/db";
import { collections } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Plus, Layers, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function CollectionsPage() {
    const allCollections = await db.query.collections.findMany({
        orderBy: [desc(collections.createdAt)],
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-8">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-900 font-serif">Volumes</h1>
                    <p className="text-zinc-500 mt-2 font-medium">Curated product collections & archival groupings.</p>
                </div>
                <Button className="gap-2 shadow-sm font-bold uppercase tracking-widest text-[10px] h-11" asChild>
                    <Link href="/admin/collections/new">
                        <Plus className="h-4 w-4" />
                        Curate New Volume
                    </Link>
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {allCollections.map((col) => (
                    <div key={col.id} className="group border border-zinc-200 rounded-xl p-6 bg-white hover:border-zinc-900 transition-all shadow-sm flex flex-col justify-between min-h-[160px]">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <Layers className="h-5 w-5 text-zinc-900" />
                                <span className="text-[10px] font-mono font-bold text-zinc-400">SLUG: {col.slug}</span>
                            </div>
                            <h3 className="text-lg font-bold text-zinc-900 group-hover:underline decoration-zinc-200 underline-offset-4">{col.name}</h3>
                            <p className="text-xs text-zinc-500 font-medium mt-2 line-clamp-2">{col.description || "No description provided."}</p>
                        </div>
                        <div className="mt-6 flex items-center justify-between pt-4 border-t border-zinc-50">
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                {new Date(col.createdAt).toLocaleDateString()}
                            </span>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900" asChild>
                                    <Link href={`/admin/collections/${col.id}/edit`}>
                                        <Edit className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}

                {allCollections.length === 0 && (
                    <div className="col-span-full py-32 text-center bg-zinc-50/50 rounded-xl border border-zinc-100 border-dashed">
                        <Layers className="h-12 w-12 text-zinc-200 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-zinc-400 uppercase tracking-widest">No Volumes Found</h3>
                        <p className="text-sm text-zinc-300 font-medium mt-2">Start curating your product groupings.</p>
                        <Button className="mt-8 shadow-none" variant="outline" asChild>
                            <Link href="/admin/collections/new">Create Volume</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

import { Card } from "@/components/ui/card";
