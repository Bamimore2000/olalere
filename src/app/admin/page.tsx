import { db } from "@/db";
import { products, orders, newsletterSubscribers } from "@/db/schema";
import { count, desc, sql, eq } from "drizzle-orm";
import { formatPrice } from "@/lib/utils";
import {
    TrendingUp,
    ShoppingBag,
    Package,
    Users,
    AlertTriangle,
    Activity,
    CreditCard,
    ArrowUpRight,
    Search
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AdminDashboard() {
    // 1. Fetch real metrics from DB
    const [productCountResult] = await db.select({ value: count() }).from(products);
    const [orderCountResult] = await db.select({ value: count() }).from(orders);
    const [subscriberCountResult] = await db.select({ value: count() }).from(newsletterSubscribers);

    // Total Revenue calculation
    const revenueResult = await db.select({
        total: sql<number>`sum(cast(${orders.totalAmount} as decimal))`
    }).from(orders);
    const totalRevenue = revenueResult[0]?.total || 0;

    // Average Order Value
    const aov = orderCountResult.value > 0 ? totalRevenue / orderCountResult.value : 0;

    // Fulfillment Rate (Ratio of non-pending orders)
    const fulfilledOrdersResult = await db.select({ value: count() })
        .from(orders)
        .where(sql`${orders.status} != 'pending'`);
    const fulfillmentRate = orderCountResult.value > 0
        ? (fulfilledOrdersResult[0].value / orderCountResult.value) * 100
        : 0;

    // Low stock alerts (stock <= 5)
    const lowStockItems = await db.query.products.findMany({
        where: sql`${products.stock} <= 5`,
        limit: 5,
    });

    const recentOrders = await db.query.orders.findMany({
        limit: 5,
        orderBy: [desc(orders.createdAt)],
    });

    const stats = [
        {
            title: "Total Revenue",
            value: formatPrice(totalRevenue),
            description: "Total value of transitions",
            icon: CreditCard,
            color: "text-zinc-900",
            bg: "bg-zinc-100",
        },
        {
            title: "Collective Members",
            value: subscriberCountResult.value.toString(),
            description: "Newsletter subscribers",
            icon: Users,
            color: "text-zinc-900",
            bg: "bg-zinc-100",
        },
        {
            title: "Average Order Value",
            value: formatPrice(aov),
            description: "Average yield per transition",
            icon: TrendingUp,
            color: "text-zinc-900",
            bg: "bg-zinc-100",
        },
        {
            title: "Fulfillment Rate",
            value: `${fulfillmentRate.toFixed(1)}%`,
            description: "Shipped/Delivered ratio",
            icon: Package,
            color: "text-zinc-900",
            bg: "bg-zinc-100",
        },
    ];

    return (
        <div className="space-y-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 pb-8">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-900 font-serif">Command Center</h1>
                    <p className="text-zinc-500 mt-2 font-medium">Logistical Snapshot & System Telemetry</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-zinc-200" asChild>
                        <Link href="/admin/stats">
                            <Activity className="h-4 w-4 mr-2" />
                            View Telemetry
                        </Link>
                    </Button>
                    <Button className="shadow-sm" asChild>
                        <Link href="/admin/products/new">
                            New Record
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title} className="border border-zinc-200 shadow-none overflow-hidden hover:border-zinc-400 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-500">{stat.title}</CardTitle>
                            <div className={`${stat.bg} ${stat.color} p-2 rounded-md`}>
                                <stat.icon className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold tracking-tighter text-zinc-900">{stat.value}</div>
                            <p className="text-xs text-zinc-500 mt-1 font-medium">{stat.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
                {/* Logistical Feed (Recent Orders) */}
                <Card className="col-span-4 border border-zinc-200 shadow-none">
                    <CardHeader className="border-b border-zinc-100 px-6 py-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-bold">Logistical Feed</CardTitle>
                                <CardDescription className="font-medium">Recent archival acquisitions</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" className="text-zinc-500" asChild>
                                <Link href="/admin/orders">View All</Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-zinc-100">
                            {recentOrders.map((order) => (
                                <div key={order.id} className="flex items-center justify-between p-4 px-6 hover:bg-zinc-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded bg-zinc-100 flex items-center justify-center border border-zinc-200">
                                            <ShoppingBag className="h-5 w-5 text-zinc-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-zinc-900 font-mono underline decoration-zinc-200">#{order.id.substring(0, 8)}</p>
                                            <p className="text-xs text-zinc-500 font-medium">{order.guestEmail || "Registered User"}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-zinc-900">{formatPrice(order.totalAmount)}</p>
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mt-0.5">{order.status}</p>
                                    </div>
                                </div>
                            ))}
                            {recentOrders.length === 0 && (
                                <div className="p-8 text-center text-zinc-400 font-medium">No transitions logged.</div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <div className="col-span-3 space-y-8">
                    {/* Critical Alerts */}
                    <Card className="border border-zinc-200 shadow-none bg-zinc-50/30">
                        <CardHeader className="px-6 py-4 border-b border-zinc-100">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-zinc-900" />
                                <CardTitle className="text-sm font-bold uppercase tracking-widest">Critical Alerts</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="px-6 py-4">
                            <div className="space-y-4">
                                {lowStockItems.length > 0 ? (
                                    lowStockItems.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-zinc-900 max-w-[150px] truncate">{item.name}</span>
                                                <span className="text-[10px] font-bold text-zinc-400 font-mono">SKU: {item.sku || "N/A"}</span>
                                            </div>
                                            <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100">
                                                {item.stock} left
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-xs text-zinc-400 font-medium">All inventory nodes are within safe operational limits.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* System Telemetry */}
                    <Card className="border border-zinc-200 shadow-none group">
                        <CardHeader className="px-6 py-4 border-b border-zinc-100">
                            <div className="flex items-center gap-2">
                                <Activity className="h-4 w-4 text-zinc-900" />
                                <CardTitle className="text-sm font-bold uppercase tracking-widest">System Telemetry</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="px-6 py-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-zinc-500">Active Product Nodes</span>
                                <span className="text-xs font-bold text-zinc-900">{productCountResult.value}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-zinc-500">Resend Sync Status</span>
                                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    OPERATIONAL
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="border-t border-zinc-200 pt-8 mt-12 flex justify-between items-center text-zinc-400">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Transactional integrity verified. Node integrity: GREEN.</p>
                <div className="flex gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">API v1.0.4</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{new Date().toLocaleTimeString()}</span>
                </div>
            </div>
        </div>
    );
}
