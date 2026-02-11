"use client";

import { Button } from "@/components/ui/button";
import { useCart, CartItem } from "@/hooks/use-cart";

interface AddToCartProps {
    product: CartItem;
    className?: string;
}

export function AddToCart({ product, className }: AddToCartProps) {
    const cart = useCart();

    const onAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        cart.addItem(product);
        cart.onOpen();
        console.log("Added to cart:", product.name);
    };

    return (
        <Button
            onClick={onAddToCart}
            size="lg"
            className={className || "w-full h-11 bg-primary text-white hover:bg-primary/90 font-bold tracking-tight rounded-sm uppercase text-xs transition-all duration-300"}
        >
            ADD TO CART
        </Button>
    );
}
