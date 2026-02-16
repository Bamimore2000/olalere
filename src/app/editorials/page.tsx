import Link from "next/link";
import { db } from "@/db";
import { editorials } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { SafeImage } from "@/components/ui/safe-image";
import { BookOpen, ArrowRight } from "lucide-react";

export const metadata = {
    title: "Stories | Borokini",
    description: "Deep dives into the history and craftsmanship of luxury jewelry.",
};

export default async function EditorialsPage() {
    const publishedStories = await db.query.editorials.findMany({
        where: eq(editorials.status, 'published'),
        orderBy: [desc(editorials.createdAt)],
    });

    return (
        <div className="bg-zinc-50 min-h-screen pb-32">
            {/* Hero Section */}
            <div className="bg-white border-b border-zinc-100 overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-4 py-32 md:px-8 relative">
                    <div className="max-w-2xl space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="h-px w-8 bg-zinc-900" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-900">The Journal</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter text-zinc-900 leading-none">
                            Our Stories.
                        </h1>
                        <p className="text-xl text-zinc-500 font-medium leading-relaxed">
                            Discover the inspiration, craftsmanship, and heritage behind our jewelry collections.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 py-20 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                    {publishedStories.map((story) => (
                        <Link key={story.id} href={`/editorials/${story.slug}`} className="group flex flex-col">
                            <div className="aspect-[16/10] overflow-hidden relative border border-zinc-100 bg-zinc-200">
                                {story.featuredImage && (
                                    <SafeImage
                                        src={story.featuredImage}
                                        alt={story.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                            <div className="mt-8 space-y-4 max-w-lg">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ring-1 ring-zinc-200 px-2 py-0.5">
                                        Inside Borokini
                                    </span>
                                    <span className="h-1 w-1 rounded-full bg-zinc-200" />
                                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                        {new Date(story.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-serif font-bold text-zinc-900 leading-tight group-hover:underline decoration-zinc-200 underline-offset-8">
                                    {story.title}
                                </h2>
                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-900 mt-6 group-hover:translate-x-2 transition-transform">
                                    Read Story
                                    <ArrowRight className="h-3 w-3" />
                                </div>
                            </div>
                        </Link>
                    ))}
                    {publishedStories.length === 0 && (
                        <div className="col-span-full py-40 text-center border border-dashed border-zinc-200 rounded-xl">
                            <BookOpen className="h-12 w-12 text-zinc-200 mx-auto mb-6" />
                            <p className="text-zinc-400 font-bold uppercase tracking-[0.2em]">Our journal is currently being updated.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
