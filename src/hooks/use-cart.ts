import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
    id: string;
    name: string;
    price: number;
    image?: string;
    images?: string[];
    quantity: number;
};

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    addItem: (data: CartItem) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
}

export const useCart = create(
    persist<CartState>(
        (set, get) => ({
            items: [],
            isOpen: false,
            onOpen: () => set({ isOpen: true }),
            onClose: () => set({ isOpen: false }),
            addItem: (data: CartItem) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((item) => item.id === data.id);

                if (existingItem) {
                    // If item exists, increase quantity
                    set({
                        items: currentItems.map((item) =>
                            item.id === data.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    });
                    return;
                }

                set({ items: [...get().items, { ...data, quantity: 1 }] });
            },
            removeItem: (id: string) => {
                set({ items: [...get().items.filter((item) => item.id !== id)] });
            },
            clearCart: () => set({ items: [] }),
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
