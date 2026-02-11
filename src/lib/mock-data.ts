export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: string;
    collections: string[]; // e.g., "Summer 2024", "Bridal", "Essentials"
    tags: string[]; // e.g., "Gold", "Diamonds", "Gift"
    material: string;
    slug: string;
};

export const mockProducts: Product[] = [
    {
        id: "1",
        name: "Eternal Gold Necklace",
        description: "A timeless piece crafted from 24k solid gold, featuring a delicate chain and a radiant pendant that captures the essence of eternal beauty. Perfect for layering or wearing alone as a statement piece.",
        price: 1299.00,
        images: ["https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=2574&auto=format&fit=crop"],
        category: "Necklaces",
        collections: ["Timeless Classics", "Bridal"],
        tags: ["Gold", "Elegant", "Best Seller"],
        material: "Gold",
        slug: "eternal-gold-necklace"
    },
    {
        id: "2",
        name: "Sapphire Royal Ring",
        description: "An exquisite deep blue sapphire set in platinum, surrounded by a halo of brilliant-cut diamonds. This ring evokes the grandeur of royalty and is designed to be a cherished heirloom.",
        price: 2499.00,
        images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2670&auto=format&fit=crop"],
        category: "Rings",
        collections: ["Royal Edition"],
        tags: ["Sapphire", "Platinum", "Luxury"],
        material: "Platinum",
        slug: "sapphire-royal-ring"
    },
    {
        id: "3",
        name: "Diamond Stud Earrings",
        description: "Classic solitaire diamond studs, featuring high-clarity stones set in 18k white gold. These earrings offer a subtle yet powerful sparkle, perfect for adding a touch of elegance to any occasion.",
        price: 899.00,
        images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2670&auto=format&fit=crop"],
        category: "Earrings",
        collections: ["Essentials"],
        tags: ["Diamond", "White Gold", "Gift"],
        material: "Diamond",
        slug: "diamond-stud-earrings"
    },
    {
        id: "4",
        name: "Golden Hour Bracelet",
        description: "A chunky gold chain bracelet that makes a bold statement. Inspired by the warm hues of sunset, this 18k gold piece is both modern and classic, suitable for daily wear.",
        price: 1550.00,
        images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2670&auto=format&fit=crop"],
        category: "Bracelets",
        collections: ["Summer Luxe"],
        tags: ["Gold", "Statement", "Chunky"],
        material: "Gold",
        slug: "golden-hour-bracelet"
    },
    {
        id: "5",
        name: "Emerald Envy Pendant",
        description: "A striking emerald cut stone suspended from a delicate gold chain. The vibrant green hue brings a pop of color and sophistication to your neckline.",
        price: 1850.00,
        images: ["https://images.unsplash.com/photo-1515562141207-7a88fb052576?q=80&w=2670&auto=format&fit=crop"],
        category: "Necklaces",
        collections: ["Gemstone Series"],
        tags: ["Emerald", "Vintage", "Color"],
        material: "Gold",
        slug: "emerald-envy-pendant"
    },
    {
        id: "6",
        name: "Obsidian Signet Ring",
        description: "A masculine yet refined signet ring featuring a polished obsidian stone set in brushed silver. A symbol of strength and grounding.",
        price: 450.00,
        images: ["https://images.unsplash.com/photo-1603974372822-793399432f83?q=80&w=2545&auto=format&fit=crop"],
        category: "Rings",
        collections: ["Men's Collection"],
        tags: ["Silver", "Minimalist", "Black"],
        material: "Silver",
        slug: "obsidian-signet-ring"
    }
];
