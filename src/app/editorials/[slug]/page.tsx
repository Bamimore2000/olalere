import { db } from "@/db";
import { editorials } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { SafeImage } from "@/components/ui/safe-image";
import Link from "next/link";
import { ChevronLeft, Share2, Bookmark } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const story = await db.query.editorials.findFirst({
        where: eq(editorials.slug, slug)
    });

    if (!story) return { title: "Story Not Found" };

    return {
        title: `${story.title} | Borokini Stories`,
        description: story.content.substring(0, 160),
        openGraph: {
            title: story.title,
            description: story.content.substring(0, 160),
            images: story.featuredImage ? [{ url: story.featuredImage }] : [],
        }
    };
}

interface EditorialPageProps {
    params: Promise<{ slug: string }>;
}

export default async function EditorialDetailPage({ params }: EditorialPageProps) {
    const { slug } = await params;

    const story = await db.query.editorials.findFirst({
        where: eq(editorials.slug, slug),
    });

    if (!story || story.status !== 'published') {
        notFound();
    }

    return (
        <article className="bg-white min-h-screen pb-32">
            {/* Article Hero */}
            <div className="max-w-[1400px] mx-auto px-4 pt-12 md:px-8">
                <Link
                    href="/editorials"
                    className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 transition-colors mb-12"
                >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Back to Stories
                </Link>

                <header className="max-w-4xl mx-auto text-center space-y-8 mb-20">
                    <div className="flex items-center justify-center gap-4">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.4em]">Inside Borokini</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tighter text-zinc-900 leading-[0.9]">
                        {story.title}
                    </h1>
                    <div className="flex items-center justify-center gap-6 pt-4">
                        <div className="flex flex-col items-center">
                            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Published On</span>
                            <span className="text-sm font-serif italic text-zinc-900">{new Date(story.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div className="h-8 w-px bg-zinc-100" />
                        <div className="flex flex-col items-center">
                            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Journal</span>
                            <span className="text-sm font-serif italic text-zinc-900">Brand News</span>
                        </div>
                    </div>
                </header>
            </div>

            {/* Featured Image */}
            {story.featuredImage && (
                <div className="max-w-[1600px] mx-auto aspect-[21/9] relative overflow-hidden bg-zinc-100 mb-20">
                    <SafeImage
                        src={story.featuredImage}
                        alt={story.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            {/* Content Area */}
            <div className="max-w-3xl mx-auto px-4 relative">
                <div className="sticky top-32 -left-20 hidden lg:flex flex-col gap-6 w-0">
                    <button className="h-10 w-10 flex items-center justify-center rounded-full border border-zinc-100 text-zinc-400 hover:text-zinc-900 hover:border-zinc-900 transition-all">
                        <Share2 className="h-4 w-4" />
                    </button>
                    <button className="h-10 w-10 flex items-center justify-center rounded-full border border-zinc-100 text-zinc-400 hover:text-zinc-900 hover:border-zinc-900 transition-all">
                        <Bookmark className="h-4 w-4" />
                    </button>
                </div>

                <div className="prose prose-zinc prose-lg mx-auto leading-[1.8] font-serif text-zinc-800 antialiased drop-cap">
                    {/* Render content - assuming markdown for now, but simple paragraphs will work */}
                    {story.content.split('\n').map((para, i) => para.trim() && (
                        <p key={i} className="mb-8">
                            {para}
                        </p>
                    ))}
                </div>

                <footer className="mt-24 pt-12 border-t border-zinc-100 text-center">
                    <div className="inline-flex items-center gap-12">
                        <Link href="/shop" className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-900 transition-colors">
                            Shop The Collection
                        </Link>
                        <div className="h-1 w-1 rounded-full bg-zinc-200" />
                        <Link href="/editorials" className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-900 transition-colors">
                            Back to Journal
                        </Link>
                    </div>
                </footer>
            </div>
        </article>
    );
}
