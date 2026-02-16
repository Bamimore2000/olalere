import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { neon } from "@neondatabase/serverless";

async function main() {
    const sql = neon(process.env.DATABASE_URL!);
    const res = await sql`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'products'
    `;
    console.log("Current columns in 'products':", res.map(r => r.column_name).join(", "));
}

main().catch(console.error);
