"use server";

import { db } from "@/db";
import { products, orders, editorials, collections, newsletterSubscribers, NewProduct } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createProduct(data: any) {
    await db.insert(products).values(data);
    revalidatePath("/admin/products");
    revalidatePath("/");
    revalidatePath("/shop");
}

export async function updateProduct(id: string, data: any) {
    await db.update(products).set(data).where(eq(products.id, id));
    revalidatePath("/admin/products");
    revalidatePath("/");
    revalidatePath("/shop");
    revalidatePath(`/product/${data.slug || id}`);
}

export async function deleteProduct(id: string) {
    await db.delete(products).where(eq(products.id, id));
    revalidatePath("/admin/products");
    revalidatePath("/");
    revalidatePath("/shop");
}

export async function bulkDeleteProducts(ids: string[]) {
    await db.delete(products).where(sql`${products.id} IN ${ids}`);
    revalidatePath("/admin/products");
    revalidatePath("/");
    revalidatePath("/shop");
}

export async function updateOrderStatus(id: string, status: string) {
    await db.update(orders).set({ status }).where(eq(orders.id, id));
    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${id}`);
}

export async function updateOrderTracking(id: string, data: { trackingNumber: string; carrier: string }) {
    await db.update(orders).set(data).where(eq(orders.id, id));
    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${id}`);
}

// Editorial Actions
export async function createEditorial(data: any) {
    await db.insert(editorials).values(data);
    revalidatePath("/admin/editorials");
    revalidatePath("/editorials");
}

export async function updateEditorial(id: string, data: any) {
    await db.update(editorials).set(data).where(eq(editorials.id, id));
    revalidatePath("/admin/editorials");
    revalidatePath("/editorials");
    revalidatePath(`/editorials/${data.slug || id}`);
}

export async function deleteEditorial(id: string) {
    await db.delete(editorials).where(eq(editorials.id, id));
    revalidatePath("/admin/editorials");
    revalidatePath("/editorials");
}

// Collection Actions
export async function createCollection(data: any) {
    await db.insert(collections).values(data);
    revalidatePath("/admin/collections");
    revalidatePath("/admin/products");
    revalidatePath("/shop");
}

export async function updateCollection(id: string, data: any) {
    await db.update(collections).set(data).where(eq(collections.id, id));
    revalidatePath("/admin/collections");
    revalidatePath("/shop");
}

export async function deleteCollection(id: string) {
    await db.delete(collections).where(eq(collections.id, id));
    revalidatePath("/admin/collections");
}

// Newsletter Actions
export async function subscribeToNewsletter(email: string) {
    const existing = await db.query.newsletterSubscribers.findFirst({
        where: eq(newsletterSubscribers.email, email),
    });

    if (existing) {
        return { error: "Already subscribed." };
    }

    await db.insert(newsletterSubscribers).values({ email });
    revalidatePath("/admin/newsletter");
    return { success: true };
}
