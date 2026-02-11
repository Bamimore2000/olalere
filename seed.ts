import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const main = async () => {
    console.log("Seeding database with dynamic imports...");

    // Dynamic imports to ensure dotenv is loaded first
    const { db } = await import("./src/db");
    const { products } = await import("./src/db/schema");

    const initialProducts = [
        // Necklaces
        {
            slug: "n1",
            name: "Golden Infinity Necklace",
            description: "A timeless piece crafted from 24k solid gold, featuring a delicate chain and a radiant pendant.",
            price: "450000.00",
            images: ["https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=2000&auto=format&fit=crop"],
            category: "necklaces",
            material: "Gold",
            stock: 10
        },
        {
            slug: "n2",
            name: "Emerald Cut Necklace",
            description: "Luxury emerald cut gemstone set in a white gold frame, perfect for gala evenings.",
            price: "1200000.00",
            images: ["https://images.unsplash.com/photo-1611085583191-a3b134066206?q=80&w=2000&auto=format&fit=crop"],
            category: "necklaces",
            material: "Emerald",
            stock: 3
        },
        {
            slug: "n3",
            name: "Vintage Gold Pendant",
            description: "A classic pendant with intricate engravings, reminiscent of royal jewelry.",
            price: "750000.00",
            images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2000&auto=format&fit=crop"],
            category: "necklaces",
            material: "Gold",
            stock: 5
        },
        {
            slug: "n4",
            name: "Rose Gold Chain",
            description: "Elegant rose gold chain, perfect for layering or wearing solo for a subtle look.",
            price: "290000.00",
            images: ["https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2000&auto=format&fit=crop"],
            category: "necklaces",
            material: "Rose Gold",
            stock: 12
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
            stock: 2
        },
        {
            slug: "e2",
            name: "Pearl Drop Earrings",
            description: "Lustrous white pearls suspended from delicate gold hooks.",
            price: "550000.00",
            images: ["https://images.unsplash.com/photo-1629227357427-bc30e380620f?q=80&w=2000&auto=format&fit=crop"],
            category: "earrings",
            material: "Pearl",
            stock: 8
        },
        {
            slug: "e3",
            name: "Sapphire Hoop Earrings",
            description: "Stunning sapphire hoops that capture the light from every angle.",
            price: "1100000.00",
            images: ["https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=2000&auto=format&fit=crop"],
            category: "earrings",
            material: "Sapphire",
            stock: 4
        },
        {
            slug: "e4",
            name: "Gold Leaf Earrings",
            description: "Nature-inspired gold leaf designs that add an organic touch to your style.",
            price: "380000.00",
            images: ["https://images.unsplash.com/photo-1630019314274-9549ff63b216?q=80&w=2000&auto=format&fit=crop"],
            category: "earrings",
            material: "Gold",
            stock: 15
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
            stock: 15
        },
        {
            slug: "r2",
            name: "Solitaire Diamond Ring",
            description: "A breathtaking solitaire diamond set in platinum, the ultimate symbol of commitment.",
            price: "2500000.00",
            images: ["https://images.unsplash.com/photo-1603912627214-904602bb0471?q=80&w=2000&auto=format&fit=crop"],
            category: "rings",
            material: "Platinum",
            stock: 1
        },
        {
            slug: "r3",
            name: "Vintage Ruby Ring",
            description: "A deep red ruby surrounded by antique silver scrollwork.",
            price: "1800000.00",
            images: ["https://images.unsplash.com/photo-1589128777073-263566ae172d?q=80&w=2000&auto=format&fit=crop"],
            category: "rings",
            material: "Ruby",
            stock: 3
        },
        {
            slug: "r4",
            name: "Eternity Gold Band",
            description: "A continuous band of sparkling pavé diamonds set in yellow gold.",
            price: "950000.00",
            images: ["https://images.unsplash.com/photo-1598560912005-597659bc7aa0?q=80&w=2000&auto=format&fit=crop"],
            category: "rings",
            material: "Gold",
            stock: 6
        },
    ];

    try {
        console.log("Cleaning up old data...");
        await db.delete(products);

        console.log("Inserting fresh luxury products...");
        await db.insert(products).values(initialProducts);
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
