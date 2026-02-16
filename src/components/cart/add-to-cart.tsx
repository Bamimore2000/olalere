"use client";

import { Button } from "@/components/ui/button";
import { useCart, CartItem } from "@/hooks/use-cart";
import { ShoppingCart } from "lucide-react";

interface AddToCartProps {
    product: Omit<CartItem, "quantity"> & { quantity?: number };
    className?: string;
    disabled?: boolean;
}

export function AddToCart({ product, className, disabled }: AddToCartProps) {
    const cart = useCart();

    const onAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!product.selectedSize) {
            alert("Please select a size first.");
            return;
        }

        cart.addItem(product);
        cart.onOpen();
    };

    return (
        <Button
            onClick={onAddToCart}
            size="lg"
            disabled={disabled}
            className={className || "w-full h-14 bg-zinc-900 text-white hover:bg-zinc-800 font-bold tracking-widest rounded-none uppercase text-[10px] transition-all duration-300 gap-2 shadow-lg"}
        >
            <ShoppingCart className="h-4 w-4" />
            Add to Bag
        </Button>
    );
}
