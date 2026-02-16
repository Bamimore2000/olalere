"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Save, X, Plus, BookOpen, Clock, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { createEditorial, updateEditorial } from "../../actions";

interface EditorialFormProps {
    initialData?: any | null;
}

export function EditorialForm({ initialData }: EditorialFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const data = {
            title: formData.get("title") as string,
            slug: formData.get("slug") as string,
            content: formData.get("content") as string,
            featuredImage: formData.get("featuredImage") as string,
            status: formData.get("status") as string,
        };

        try {
            if (initialData) {
                await updateEditorial(initialData.id, data);
            } else {
                await createEditorial(data);
            }
            router.push("/admin/editorials");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight font-serif">
                        {initialData ? "Edit Narrative" : "Compose New Story"}
                    </h1>
                    <p className="text-sm text-zinc-500 font-medium">Record a new chapter in the brand's archive.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" type="button" onClick={() => router.back()}>
                        Discard
                    </Button>
                    <Button type="submit" disabled={isLoading} className="gap-2 shadow-sm font-bold uppercase tracking-widest text-[10px]">
                        <Save className="h-4 w-4" />
                        {isLoading ? "Preserving..." : "Archive Story"}
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <Card className="border border-zinc-200 shadow-none">
                        <CardHeader>
                            <CardTitle className="text-lg">Manuscript</CardTitle>
                            <CardDescription>The core narrative of the piece.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Story Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="e.g., The Heritage of 24k Gold"
                                    defaultValue={initialData?.title}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="slug">Reference Slug</Label>
                                <Input
                                    id="slug"
                                    name="slug"
                                    placeholder="e.g., heritage-24k-gold"
                                    defaultValue={initialData?.slug}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="content">Editorial Content (Markdown/Rich Text)</Label>
                                <Textarea
                                    id="content"
                                    name="content"
                                    placeholder="Begin your narrative..."
                                    className="min-h-[400px] font-serif leading-relaxed"
                                    defaultValue={initialData?.content}
                                    required
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="border border-zinc-200 shadow-none">
                        <CardHeader>
                            <CardTitle className="text-lg">Visual Anchor</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="featuredImage">Cover Image URL</Label>
                                <Input
                                    id="featuredImage"
                                    name="featuredImage"
                                    placeholder="https://..."
                                    defaultValue={initialData?.featuredImage}
                                />
                            </div>
                            {initialData?.featuredImage && (
                                <div className="mt-2 h-40 w-full rounded border border-zinc-100 overflow-hidden bg-zinc-50 flex items-center justify-center">
                                    <img src={initialData.featuredImage} alt="Cover" className="h-full w-full object-cover" />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="border border-zinc-200 shadow-none">
                        <CardHeader>
                            <CardTitle className="text-lg">Publishing Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <select
                                id="status"
                                name="status"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                defaultValue={initialData?.status || "draft"}
                            >
                                <option value="draft">Manuscript (Draft)</option>
                                <option value="published">Archived (Published)</option>
                            </select>

                            <div className="p-4 bg-zinc-50 border border-zinc-100 rounded space-y-3">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-3 w-3 text-zinc-400" />
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Draft Status: ACTIVE</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-3 w-3 text-zinc-400" />
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Sync Integrity: VERIFIED</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
}
