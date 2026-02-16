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
    CardTitle,
    CardFooter
} from "@/components/ui/card";
import { ArrowLeft, Save, X, Plus, Trash2, Layers } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "../../actions";
import { cn } from "@/lib/utils";

interface ProductFormProps {
    initialData?: any | null;
    collections?: any[];
}

const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "ONE SIZE"];

export function ProductForm({ initialData, collections = [] }: ProductFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<string[]>(initialData?.images || [""]);
    const [sizeStock, setSizeStock] = useState<Record<string, number>>(initialData?.sizeStock || {});

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);

        const totalStock = Object.values(sizeStock).reduce((acc, curr) => acc + curr, 0);

        const data = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            price: formData.get("price") as string,
            compareAtPrice: formData.get("compareAtPrice") ? (formData.get("compareAtPrice") as string) : null,
            sku: formData.get("sku") as string,
            category: formData.get("category") as string,
            collectionId: formData.get("collectionId") === "none" ? null : formData.get("collectionId") as string,
            slug: formData.get("slug") as string,
            material: formData.get("material") as string,
            stock: totalStock || parseInt(formData.get("stock") as string || "0"),
            sizeStock: sizeStock,
            images: images.filter(img => img.trim() !== ""),
        };

        try {
            if (initialData) {
                await updateProduct(initialData.id, data);
            } else {
                await createProduct(data);
            }
            router.push("/admin/products");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    const addImageField = () => setImages([...images, ""]);
    const removeImageField = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages.length === 0 ? [""] : newImages);
    };
    const updateImageField = (index: number, value: string) => {
        const newImages = [...images];
        newImages[index] = value;
        setImages(newImages);
    };

    const handleSizeStockChange = (size: string, value: string) => {
        const count = parseInt(value) || 0;
        setSizeStock(prev => ({ ...prev, [size]: count }));
    };

    return (
        <form onSubmit={onSubmit} className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/products">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight font-serif">
                            {initialData ? "Edit Product" : "New Product"}
                        </h1>
                        <p className="text-sm text-zinc-500">
                            {initialData ? `Editing ${initialData.name}` : "Create a new luxury piece."}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" type="button" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading} className="gap-2">
                        <Save className="h-4 w-4" />
                        {isLoading ? "Saving..." : "Save Product"}
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <Card className="border border-zinc-200 shadow-none">
                        <CardHeader>
                            <CardTitle className="text-lg">General Information</CardTitle>
                            <CardDescription>Basic product details.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Product Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="e.g., Diamond Infinity Ring"
                                        defaultValue={initialData?.name}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="sku">SKU (Identifier)</Label>
                                    <Input
                                        id="sku"
                                        name="sku"
                                        placeholder="BT-001-GOLD"
                                        defaultValue={initialData?.sku}
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="slug">Product Slug (URL)</Label>
                                <Input
                                    id="slug"
                                    name="slug"
                                    placeholder="e.g., diamond-infinity-ring"
                                    defaultValue={initialData?.slug}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Tell the story of this piece..."
                                    className="min-h-[150px]"
                                    defaultValue={initialData?.description}
                                    required
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-zinc-200 shadow-none">
                        <CardHeader>
                            <CardTitle className="text-lg">Product Media</CardTitle>
                            <CardDescription>Add image links for this product.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                {images.map((url, index) => (
                                    <div key={index} className="flex gap-2">
                                        <div className="flex-1">
                                            <Input
                                                placeholder="https://images.unsplash.com/..."
                                                value={url}
                                                onChange={(e) => updateImageField(index, e.target.value)}
                                                required={index === 0}
                                            />
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            type="button"
                                            onClick={() => removeImageField(index)}
                                            className="text-zinc-400 hover:text-red-500"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addImageField}
                                    className="w-full border-dashed"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Image
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-zinc-200 shadow-none">
                        <CardHeader>
                            <CardTitle className="text-lg">Inventory Tracking</CardTitle>
                            <CardDescription>Stock management by size.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                                {AVAILABLE_SIZES.map((size) => (
                                    <div key={size} className="space-y-2">
                                        <Label htmlFor={`size-${size}`} className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">{size}</Label>
                                        <Input
                                            id={`size-${size}`}
                                            type="number"
                                            placeholder="0"
                                            className="h-8"
                                            value={sizeStock[size] || ""}
                                            onChange={(e) => handleSizeStockChange(size, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="border border-zinc-200 shadow-none">
                        <CardHeader>
                            <CardTitle className="text-lg">Pricing</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="price">Price (NGN)</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    defaultValue={initialData?.price}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="compareAtPrice">Compare At Price (NGN)</Label>
                                <Input
                                    id="compareAtPrice"
                                    name="compareAtPrice"
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    defaultValue={initialData?.compareAtPrice}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-zinc-200 shadow-none">
                        <CardHeader>
                            <CardTitle className="text-lg">Classification</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="collectionId">Collection</Label>
                                <select
                                    id="collectionId"
                                    name="collectionId"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    defaultValue={initialData?.collectionId || "none"}
                                >
                                    <option value="none">None</option>
                                    {collections.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="category">Category</Label>
                                <select
                                    id="category"
                                    name="category"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    defaultValue={initialData?.category || "necklaces"}
                                >
                                    <option value="necklaces">Necklaces</option>
                                    <option value="rings">Rings</option>
                                    <option value="earrings">Earrings</option>
                                    <option value="bracelets">Bracelets</option>
                                    <option value="watches">Watches</option>
                                </select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="material">Material</Label>
                                <Input
                                    id="material"
                                    name="material"
                                    placeholder="e.g., 24k Gold"
                                    defaultValue={initialData?.material || ""}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
}
