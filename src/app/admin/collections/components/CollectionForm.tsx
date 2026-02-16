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
import { Save, Layers, Clock, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { createCollection, updateCollection } from "../../actions";

interface CollectionFormProps {
    initialData?: any | null;
}

export function CollectionForm({ initialData }: CollectionFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const data = {
            name: formData.get("name") as string,
            slug: formData.get("slug") as string,
            description: formData.get("description") as string,
        };

        try {
            if (initialData) {
                await updateCollection(initialData.id, data);
            } else {
                await createCollection(data);
            }
            router.push("/admin/collections");
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
                        {initialData ? "Refine Volume" : "Curate New Volume"}
                    </h1>
                    <p className="text-sm text-zinc-500 font-medium">Define a new collection (volume) for the archive.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" type="button" onClick={() => router.back()}>
                        Discard
                    </Button>
                    <Button type="submit" disabled={isLoading} className="gap-2 shadow-sm font-bold uppercase tracking-widest text-[10px]">
                        <Save className="h-4 w-4" />
                        {isLoading ? "Syncing..." : "Publish Volume"}
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <Card className="border border-zinc-200 shadow-none">
                        <CardHeader>
                            <CardTitle className="text-lg">Volume Definition</CardTitle>
                            <CardDescription>The core identifier for this collection.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Volume Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="e.g., Nouveau Archives"
                                    defaultValue={initialData?.name}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="slug">Reference Slug</Label>
                                <Input
                                    id="slug"
                                    name="slug"
                                    placeholder="e.g., nouveau-archives"
                                    defaultValue={initialData?.slug}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Volume Preface</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Describe the aesthetic and intent of this volume..."
                                    className="min-h-[150px]"
                                    defaultValue={initialData?.description}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="border border-zinc-200 shadow-none bg-zinc-50/30">
                        <CardHeader>
                            <CardTitle className="text-lg">System Integrity</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Layers className="h-4 w-4 text-zinc-900" />
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-zinc-400">Node Linkage: READY</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-zinc-900" />
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-zinc-400">Archive Status: STANDBY</span>
                            </div>

                            <div className="p-4 bg-white border border-zinc-200 rounded text-xs text-zinc-500 font-medium">
                                Once published, this volume will be available as a filtering node in the front-end shop experience.
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
}
