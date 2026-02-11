import { pgTable, text, integer, decimal, timestamp, uuid, json } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    images: json("images").$type<string[]>().notNull(), // Array of image URLs
    category: text("category").notNull(), // e.g., 'necklaces', 'rings', 'earrings'
    slug: text("slug").unique().notNull(), // e.g., 'solitaire-diamond-ring' or 'r2'
    material: text("material"), // e.g., 'Gold', 'Silver', 'Platinum'
    stock: integer("stock").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id"), // Clerk User ID (optional for guest checkout)
    guestEmail: text("guest_email"),
    totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
    status: text("status").notNull().default("pending"), // pending, paid, shipped, delivered
    stripePaymentId: text("stripe_payment_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orderItems = pgTable("order_items", {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id").references(() => orders.id).notNull(),
    productId: uuid("product_id").references(() => products.id).notNull(),
    quantity: integer("quantity").notNull(),
    priceAtPurchase: decimal("price_at_purchase", { precision: 10, scale: 2 }).notNull(),
});

// Types for TypeScript usage
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;
