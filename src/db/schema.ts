import { pgTable, text, integer, decimal, timestamp, uuid, json } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    compareAtPrice: decimal("compare_at_price", { precision: 10, scale: 2 }), // For showing original value
    images: json("images").$type<string[]>().notNull(),
    category: text("category").notNull(),
    collectionId: uuid("collection_id"), // Link to collections
    slug: text("slug").unique().notNull(),
    sku: text("sku").unique(), // Archive/Product identifier
    material: text("material"),
    stock: integer("stock").notNull().default(0), // Total stock
    sizeStock: json("size_stock").$type<Record<string, number>>(), // { "XS": 5, "S": 10, ... }
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id"),
    guestEmail: text("guest_email"),
    totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
    status: text("status").notNull().default("pending"),
    stripePaymentId: text("stripe_payment_id"),
    trackingNumber: text("tracking_number"),
    carrier: text("carrier"), // DHL, FedEx, etc.
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const collections = pgTable("collections", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").unique().notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").unique().notNull(),
    isVerified: timestamp("is_verified"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const editorials = pgTable("editorials", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").unique().notNull(),
    content: text("content").notNull(), // Rich text content
    featuredImage: text("featured_image"),
    status: text("status").notNull().default("draft"), // draft, published
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
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
