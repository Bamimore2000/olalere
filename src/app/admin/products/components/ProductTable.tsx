"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Edit,
    Trash2,
    MoreHorizontal,
    CheckSquare,
    Square,
    AlertCircle,
    ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { formatPrice, cn } from "@/lib/utils";
import { DeleteProductButton } from "./DeleteProductButton";
import { bulkDeleteProducts } from "../../actions";
import { useRouter } from "next/navigation";

interface ProductTableProps {
    products: any[];
}

export function ProductTable({ products }: ProductTableProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const toggleSelectAll = () => {
        if (selectedIds.length === products.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(products.map((p) => p.id));
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handleBulkDelete = async () => {
        if (!confirm(`Are you sure you want to delete ${selectedIds.length} items? This action cannot be undone.`)) return;

        setIsDeleting(true);
        try {
            await bulkDeleteProducts(selectedIds);
            setSelectedIds([]);
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Failed to delete items.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="space-y-4">
            {selectedIds.length > 0 && (
                <div className="flex items-center justify-between p-3 bg-zinc-900 text-white rounded-lg animate-in slide-in-from-top-4 duration-300">
                    <div className="flex items-center gap-3 ml-2">
                        <CheckSquare className="h-4 w-4 text-emerald-400" />
                        <span className="text-sm font-bold uppercase tracking-widest">{selectedIds.length} Nodes Selected</span>
                    </div>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleBulkDelete}
                        disabled={isDeleting}
                        className="bg-red-600 hover:bg-red-700 h-8"
                    >
                        {isDeleting ? "Deleting..." : "Bulk Delete"}
                    </Button>
                </div>
            )}

            <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-zinc-50/50 border-b border-zinc-200">
                            <tr>
                                <th className="px-6 py-4 w-12">
                                    <button onClick={toggleSelectAll} className="text-zinc-400 hover:text-zinc-900 transition-colors">
                                        {selectedIds.length === products.length && products.length > 0 ? (
                                            <CheckSquare className="h-4 w-4 text-zinc-900" />
                                        ) : (
                                            <Square className="h-4 w-4" />
                                        )}
                                    </button>
                                </th>
                                <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px] text-zinc-500">Record</th>
                                <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px] text-zinc-500 text-center">Stock Matrix</th>
                                <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px] text-zinc-500">Value (NGN)</th>
                                <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px] text-zinc-500">System ID</th>
                                <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px] text-zinc-500 text-right">Settings</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 font-medium">
                            {products.map((product) => {
                                const isSelected = selectedIds.includes(product.id);
                                return (
                                    <tr key={product.id} className={cn(
                                        "hover:bg-zinc-50/50 transition-colors",
                                        isSelected && "bg-zinc-50/80"
                                    )}>
                                        <td className="px-6 py-4">
                                            <button onClick={() => toggleSelect(product.id)} className="text-zinc-400 hover:text-zinc-900 transition-colors">
                                                {isSelected ? (
                                                    <CheckSquare className="h-4 w-4 text-zinc-900" />
                                                ) : (
                                                    <Square className="h-4 w-4" />
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded bg-zinc-100 overflow-hidden border border-zinc-200 flex-shrink-0">
                                                    {product.images?.[0] ? (
                                                        <img src={product.images[0]} alt="" className="h-full w-full object-cover" />
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center text-[8px] text-zinc-400 font-bold uppercase">NULL</div>
                                                    )}
                                                </div>
                                                <div className="max-w-[180px]">
                                                    <p className="font-bold text-zinc-900 truncate">{product.name}</p>
                                                    <p className="text-[10px] text-zinc-400 font-bold uppercase truncate">{product.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col items-center gap-1.5">
                                                <div className="flex gap-1">
                                                    <div className={cn("h-1.5 w-4 rounded-full", product.stock > 10 ? "bg-emerald-400" : product.stock > 0 ? "bg-amber-400" : "bg-red-400")} />
                                                    <div className={cn("h-1.5 w-4 rounded-full", product.stock > 20 ? "bg-emerald-400" : product.stock > 10 ? "bg-zinc-200" : "bg-zinc-200")} />
                                                    <div className={cn("h-1.5 w-4 rounded-full", product.stock > 50 ? "bg-emerald-400" : "bg-zinc-200")} />
                                                </div>
                                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">{product.stock} Units</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-zinc-900 font-bold">{formatPrice(product.price)}</span>
                                                {product.compareAtPrice && (
                                                    <span className="text-[10px] text-zinc-400 line-through font-bold">{formatPrice(product.compareAtPrice)}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-[10px] font-mono font-bold text-zinc-400">{product.sku || "PENDING"}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-[180px]">
                                                    <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Archival Controls</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/admin/products/${product.id}/edit`} className="flex items-center gap-2 cursor-pointer font-bold text-zinc-600">
                                                            <Edit className="h-4 w-4" />
                                                            Edit Record
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DeleteProductButton id={product.id} />
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {products.length === 0 && (
                    <div className="py-20 text-center">
                        <AlertCircle className="h-8 w-8 text-zinc-200 mx-auto mb-3" />
                        <p className="text-sm text-zinc-400 font-bold uppercase tracking-widest">Archive Empty</p>
                    </div>
                )}
            </div>
        </div>
    );
}
