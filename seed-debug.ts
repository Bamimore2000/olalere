import { db } from "./src/db";
import { products } from "./src/db/schema";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const main = async () => {
    console.log("DEBUG: Starting seed process...");
    console.log("DEBUG: DB URL length:", process.env.DATABASE_URL?.length || 0);

    const testProduct = {
        slug: "test-" + Date.now(),
        name: "Test Connection Product",
        description: "Testing DB connection",
        price: "1.00",
        images: ["https://example.com/test.jpg"],
        category: "test",
        material: "Test",
        stock: 1
    };

    try {
        console.log("DEBUG: Attempting to delete old products (optional)...");
        // await db.delete(products); // Commented out for minimal test

        console.log("DEBUG: Attempting to insert test product...");
        await db.insert(products).values(testProduct);
        console.log("DEBUG: Insert successful!");
    } catch (error) {
        console.error("DEBUG: Database operation FAILED!");
        console.error(error);
        process.exit(1);
    }

    console.log("DEBUG: Seeding process finished successfully!");
    process.exit(0);
};

main().catch((err) => {
    console.error("DEBUG: Uncaught error in main:", err);
    process.exit(1);
});
