import { db } from "@/db";
import { editorials } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Plus, BookOpen, Clock, CheckCircle, MoreHorizontal, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default async function EditorialsPage() {
    const allEditorials = await db.query.editorials.findMany({
        orderBy: [desc(editorials.createdAt)],
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-8">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-900 font-serif">Archive Stories</h1>
                    <p className="text-zinc-500 mt-2 font-medium">Brand narratives & historical manuscripts.</p>
                </div>
                <Button className="gap-2 shadow-sm font-bold uppercase tracking-widest text-[10px] h-11" asChild>
                    <Link href="/admin/editorials/new">
                        <Plus className="h-4 w-4" />
                        Compose New Story
                    </Link>
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {allEditorials.map((story) => (
                    <Card key={story.id} className="group border border-zinc-200 shadow-none overflow-hidden hover:border-zinc-400 transition-all">
                        <div className="aspect-video w-full bg-zinc-100 relative overflow-hidden">
                            {story.featuredImage ? (
                                <img src={story.featuredImage} alt={story.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center">
                                    <BookOpen className="h-8 w-8 text-zinc-200" />
                                </div>
                            )}
                            <div className="absolute top-3 left-3">
                                <span className={cn(
                                    "px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest shadow-sm border",
                                    story.status === 'published' ? "bg-emerald-500 text-white border-emerald-400" : "bg-white text-zinc-500 border-zinc-200"
                                )}>
                                    {story.status}
                                </span>
                            </div>
                        </div>
                        <div className="p-5 space-y-3">
                            <div>
                                <h3 className="font-bold text-zinc-900 group-hover:underline decoration-zinc-200 underline-offset-4">{story.title}</h3>
                                <p className="text-[10px] text-zinc-400 font-mono mt-1 font-bold">SLUG: {story.slug}</p>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                    {new Date(story.createdAt).toLocaleDateString()}
                                </span>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900" asChild>
                                        <Link href={`/admin/editorials/${story.id}/edit`}>
                                            <Edit className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}

                {allEditorials.length === 0 && (
                    <div className="col-span-full py-32 text-center bg-zinc-50/50 rounded-xl border border-zinc-100 border-dashed">
                        <BookOpen className="h-12 w-12 text-zinc-200 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-zinc-400 uppercase tracking-widest">Archive Empty</h3>
                        <p className="text-sm text-zinc-300 font-medium mt-2">No narratives have been recorded yet.</p>
                        <Button className="mt-8 shadow-none" variant="outline" asChild>
                            <Link href="/admin/editorials/new">Start Writing</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

// Minimal Card component since I can't import shadcn easily here without checking
function Card({ children, className }: { children: React.ReactNode, className?: string }) {
    return <div className={cn("bg-white rounded-lg", className)}>{children}</div>;
}

import { cn } from "@/lib/utils";
