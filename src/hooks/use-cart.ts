import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
    id: string;
    name: string;
    price: number;
    image?: string;
    images?: string[];
    quantity: number;
    category?: string;
    stock?: number;
    slug?: string;
    selectedSize?: string;
};

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    addItem: (data: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
    removeItem: (id: string, selectedSize?: string) => void;
    updateQuantity: (id: string, quantity: number, selectedSize?: string) => void;
    increaseQuantity: (id: string, selectedSize?: string) => void;
    decreaseQuantity: (id: string, selectedSize?: string) => void;
    clearCart: () => void;
}

export const useCart = create(
    persist<CartState>(
        (set, get) => ({
            items: [],
            isOpen: false,
            onOpen: () => set({ isOpen: true }),
            onClose: () => set({ isOpen: false }),
            addItem: (data: Omit<CartItem, "quantity"> & { quantity?: number }) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((item) =>
                    item.id === data.id && item.selectedSize === data.selectedSize
                );

                if (existingItem) {
                    set({
                        items: currentItems.map((item) =>
                            item.id === data.id && item.selectedSize === data.selectedSize
                                ? { ...item, quantity: item.quantity + (data.quantity || 1) }
                                : item
                        ),
                    });
                    return;
                }

                set({ items: [...get().items, { ...data, quantity: data.quantity || 1 }] });
            },
            removeItem: (id: string, selectedSize?: string) => {
                set({
                    items: [...get().items.filter((item) =>
                        !(item.id === id && item.selectedSize === selectedSize)
                    )]
                });
            },
            updateQuantity: (id: string, quantity: number, selectedSize?: string) => {
                set({
                    items: get().items.map((item) =>
                        (item.id === id && item.selectedSize === selectedSize)
                            ? { ...item, quantity: Math.max(0, quantity) }
                            : item
                    ).filter((item) => item.quantity > 0),
                });
            },
            increaseQuantity: (id: string, selectedSize?: string) => {
                const currentItems = get().items;
                set({
                    items: currentItems.map((item) =>
                        (item.id === id && item.selectedSize === selectedSize)
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                });
            },
            decreaseQuantity: (id: string, selectedSize?: string) => {
                const currentItems = get().items;
                set({
                    items: currentItems.map((item) =>
                        (item.id === id && item.selectedSize === selectedSize)
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    ).filter((item) => item.quantity > 0),
                });
            },
            clearCart: () => set({ items: [] }),
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
