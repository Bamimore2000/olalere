import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const main = async () => {
    console.log("Seeding database with dynamic imports...");

    // Dynamic imports to ensure dotenv is loaded first
    const { db } = await import("./src/db");
    const { products, collections } = await import("./src/db/schema");

    const initialCollections = [
        { name: "Daily Deals", slug: "deals", description: "Exclusive daily offers on premium jewelry." },
        { name: "Trending Now", slug: "trending", description: "Our most popular pieces right now." },
        { name: "Necklaces", slug: "necklaces", description: "Timeless necklaces for every occasion." },
        { name: "Rings", slug: "rings", description: "Elegant rings crafted with precision." },
        { name: "Earrings", slug: "earrings", description: "Stunning earrings and solitaire studs." },
        { name: "Watches", slug: "watches", description: "Masterfully crafted timepieces." },
        { name: "Gift Sets", slug: "gifts", description: "Curated sets for your loved ones." },
        { name: "New Arrivals", slug: "new", description: "The latest additions to our luxury archive." },
    ];

    const initialProducts = [
        // ... (existing products)
    ];

    try {
        console.log("Cleaning up old data...");
        await db.delete(products);
        await db.delete(collections);

        console.log("Inserting fresh luxury collections...");
        const insertedCollections = await db.insert(collections).values(initialCollections).returning();

        // Map collection slugs to IDs for linking
        const collectionMap = Object.fromEntries(insertedCollections.map(c => [c.slug, c.id]));

        const productsWithCollections = [
            // Necklaces
            {
                slug: "n1",
                name: "Golden Infinity Necklace",
                description: "A timeless piece crafted from 24k solid gold, featuring a delicate chain and a radiant pendant.",
                price: "450000.00",
                images: ["https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=2000&auto=format&fit=crop"],
                category: "necklaces",
                material: "Gold",
                collectionId: collectionMap["necklaces"],
                sku: "BOR-NK-001",
                stock: 10,
                sizeStock: { "ONE SIZE": 10 }
            },
            {
                slug: "n2",
                name: "Emerald Cut Necklace",
                description: "Luxury emerald cut gemstone set in a white gold frame, perfect for gala evenings.",
                price: "1200000.00",
                images: ["https://images.unsplash.com/photo-1611085583191-a3b134066206?q=80&w=2000&auto=format&fit=crop"],
                category: "necklaces",
                material: "Emerald",
                collectionId: collectionMap["necklaces"],
                sku: "BOR-NK-002",
                stock: 3,
                sizeStock: { "ONE SIZE": 3 }
            },
            {
                slug: "n3",
                name: "Vintage Gold Pendant",
                description: "A classic pendant with intricate engravings, reminiscent of royal jewelry.",
                price: "750000.00",
                images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2000&auto=format&fit=crop"],
                category: "necklaces",
                material: "Gold",
                collectionId: collectionMap["necklaces"],
                sku: "BOR-NK-003",
                stock: 5,
                sizeStock: { "ONE SIZE": 5 }
            },
            {
                slug: "n4",
                name: "Rose Gold Chain",
                description: "Elegant rose gold chain, perfect for layering or wearing solo for a subtle look.",
                price: "290000.00",
                images: ["https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2000&auto=format&fit=crop"],
                category: "necklaces",
                material: "Rose Gold",
                collectionId: collectionMap["necklaces"],
                sku: "BOR-NK-004",
                stock: 12,
                sizeStock: { "ONE SIZE": 12 }
            },
            // Earrings
            {
                slug: "e1",
                name: "Diamond Stud Earrings",
                description: "Classic solitaire diamond studs, perfect for adding a touch of elegance to any occasion.",
                price: "890000.00",
                images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2000&auto=format&fit=crop"],
                category: "earrings",
                material: "Diamond",
                collectionId: collectionMap["earrings"],
                sku: "BOR-ER-001",
                stock: 2,
                sizeStock: { "ONE SIZE": 2 }
            },
            {
                slug: "e2",
                name: "Pearl Drop Earrings",
                description: "Lustrous white pearls suspended from delicate gold hooks.",
                price: "550000.00",
                images: ["https://images.unsplash.com/photo-1629227357427-bc30e380620f?q=80&w=2000&auto=format&fit=crop"],
                category: "earrings",
                material: "Pearl",
                collectionId: collectionMap["earrings"],
                sku: "BOR-ER-002",
                stock: 8,
                sizeStock: { "ONE SIZE": 8 }
            },
            {
                slug: "e3",
                name: "Sapphire Hoop Earrings",
                description: "Stunning sapphire hoops that capture the light from every angle.",
                price: "1100000.00",
                images: ["https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=2000&auto=format&fit=crop"],
                category: "earrings",
                material: "Sapphire",
                collectionId: collectionMap["earrings"],
                sku: "BOR-ER-003",
                stock: 4,
                sizeStock: { "ONE SIZE": 4 }
            },
            {
                slug: "e4",
                name: "Gold Leaf Earrings",
                description: "Nature-inspired gold leaf designs that add an organic touch to your style.",
                price: "380000.00",
                images: ["https://images.unsplash.com/photo-1630019314274-9549ff63b216?q=80&w=2000&auto=format&fit=crop"],
                category: "earrings",
                material: "Gold",
                collectionId: collectionMap["earrings"],
                sku: "BOR-ER-004",
                stock: 15,
                sizeStock: { "ONE SIZE": 15 }
            },
            // Rings
            {
                slug: "r1",
                name: "Classic Band Ring",
                description: "A simple yet powerful gold band, perfect for daily wear.",
                price: "320000.00",
                images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2000&auto=format&fit=crop"],
                category: "rings",
                material: "Gold",
                collectionId: collectionMap["rings"],
                sku: "BOR-RG-001",
                stock: 15,
                sizeStock: { "M": 5, "L": 10 }
            },
            {
                slug: "r2",
                name: "Solitaire Diamond Ring",
                description: "A breathtaking solitaire diamond set in platinum, the ultimate symbol of commitment.",
                price: "2500000.00",
                images: ["https://images.unsplash.com/photo-1603912627214-904602bb0471?q=80&w=2000&auto=format&fit=crop"],
                category: "rings",
                material: "Platinum",
                collectionId: collectionMap["rings"],
                sku: "BOR-RG-002",
                stock: 1,
                sizeStock: { "L": 1 }
            },
            {
                slug: "r3",
                name: "Vintage Ruby Ring",
                description: "A deep red ruby surrounded by antique silver scrollwork.",
                price: "1800000.00",
                images: ["https://images.unsplash.com/photo-1589128777073-263566ae172d?q=80&w=2000&auto=format&fit=crop"],
                category: "rings",
                material: "Ruby",
                collectionId: collectionMap["rings"],
                sku: "BOR-RG-003",
                stock: 3,
                sizeStock: { "M": 3 }
            },
            {
                slug: "r4",
                name: "Eternity Gold Band",
                description: "A continuous band of sparkling pavé diamonds set in yellow gold.",
                price: "950000.00",
                images: ["https://images.unsplash.com/photo-1598560912005-597659bc7aa0?q=80&w=2000&auto=format&fit=crop"],
                category: "rings",
                material: "Gold",
                collectionId: collectionMap["rings"],
                sku: "BOR-RG-004",
                stock: 6,
                sizeStock: { "S": 3, "M": 3 }
            },
        ];

        console.log("Inserting fresh luxury products...");
        await db.insert(products).values(productsWithCollections as any);
        console.log("Seeding complete!");
    } catch (error) {
        console.error("Seeding failed during database operations:", error);
        process.exit(1);
    }
    process.exit(0);
};

main().catch((err) => {
    console.error("Uncaught error during seeding:", err);
    process.exit(1);
});
