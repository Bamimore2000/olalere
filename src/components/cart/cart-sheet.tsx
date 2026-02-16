"use client";

import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

export function CartSheet() {
    const cart = useCart();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Cart</span>
            </Button>
        )
    }

    const itemsCount = cart.items.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.items.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);

    return (
        <Sheet open={cart.isOpen} onOpenChange={(open) => !open && cart.onClose()}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    onClick={() => cart.onOpen()}
                >
                    <ShoppingBag className="h-5 w-5" />
                    {itemsCount > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">
                            {itemsCount}
                        </span>
                    )}
                    <span className="sr-only">Cart</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col p-0 sm:max-w-lg bg-white border-l">
                <SheetHeader className="px-4 py-4 border-b">
                    <SheetTitle className="font-serif text-xl uppercase tracking-tighter">My Cart ({itemsCount})</SheetTitle>
                </SheetHeader>

                {cart.items.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center space-y-2">
                        <ShoppingBag className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
                        <span className="text-lg font-medium text-muted-foreground">
                            Your cart is empty
                        </span>
                    </div>
                ) : (
                    <>
                        <ScrollArea className="flex-1 px-4">
                            <ul className="space-y-4">
                                {cart.items.map((item) => (
                                    <li key={`${item.id}-${item.selectedSize}`} className="flex py-4 group">
                                        <div className="relative h-28 w-24 overflow-hidden rounded-none border border-zinc-100 bg-zinc-50">
                                            <Image
                                                src={item.images?.[0] || item.image || '/placeholder.png'}
                                                alt={item.name}
                                                fill
                                                className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="ml-4 flex flex-1 flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between text-sm font-bold text-zinc-900 uppercase tracking-tighter">
                                                    <h3 className="line-clamp-1">{item.name}</h3>
                                                    <p className="ml-4 font-serif">{formatPrice(item.price)}</p>
                                                </div>
                                                <div className="mt-1 flex items-center gap-2">
                                                    {item.selectedSize && (
                                                        <span className="inline-flex items-center rounded-none border border-zinc-200 bg-white px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-zinc-500">
                                                            Size: {item.selectedSize}
                                                        </span>
                                                    )}
                                                    <span className="text-[9px] font-bold text-zinc-300 uppercase tracking-widest">{item.category}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center border border-zinc-200 rounded-none bg-white">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 rounded-none border-r border-zinc-100 hover:bg-zinc-50"
                                                        onClick={() => cart.decreaseQuantity(item.id, item.selectedSize)}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="w-8 text-center text-[10px] font-bold uppercase tracking-widest text-zinc-900">
                                                        {item.quantity}
                                                    </span>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 rounded-none border-l border-zinc-100 hover:bg-zinc-50"
                                                        onClick={() => cart.increaseQuantity(item.id, item.selectedSize)}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>

                                                <div className="flex">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-red-500 transition-colors"
                                                        onClick={() => cart.removeItem(item.id, item.selectedSize)}
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </ScrollArea>
                        <div className="space-y-4 p-4 border-t bg-zinc-50">
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-base font-medium text-foreground">
                                    <span className="uppercase tracking-wide">Subtotal</span>
                                    <span>{formatPrice(totalPrice)}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Shipping and taxes calculated at checkout.
                                </p>
                            </div>
                            <Button
                                className="w-full uppercase tracking-widest font-bold h-12 text-sm"
                                size="lg"
                                onClick={() => {
                                    alert("Proceeding to checkout...");
                                    // In a real app, this would redirect to /checkout
                                }}
                            >
                                Checkout
                            </Button>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}
