import { db } from "@/db";
import { orders, orderItems, products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import {
    ArrowLeft,
    Calendar,
    CreditCard,
    Mail,
    MapPin,
    Package,
    User,
    CheckCircle,
    Clock,
    Truck,
    AlertCircle
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UpdateOrderStatusButton } from "../components/UpdateOrderStatusButton";
import { TrackingForm } from "../components/TrackingForm";

interface OrderDetailsPageProps {
    params: Promise<{ id: string }>;
}

export default async function OrderDetailsPage({ params }: OrderDetailsPageProps) {
    const { id } = await params;

    const order = await db.query.orders.findFirst({
        where: eq(orders.id, id),
    });

    if (!order) {
        notFound();
    }

    const items = await db.select({
        id: orderItems.id,
        quantity: orderItems.quantity,
        priceAtPurchase: orderItems.priceAtPurchase,
        productName: products.name,
        productImage: products.images,
    })
        .from(orderItems)
        .leftJoin(products, eq(orderItems.productId, products.id))
        .where(eq(orderItems.orderId, id));

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'paid': return 'text-emerald-600';
            case 'pending': return 'text-amber-600';
            case 'shipped': return 'text-blue-600';
            case 'delivered': return 'text-zinc-600';
            default: return 'text-zinc-600';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'paid': return <CheckCircle className="h-5 w-5" />;
            case 'pending': return <Clock className="h-5 w-5" />;
            case 'shipped': return <Truck className="h-5 w-5" />;
            case 'delivered': return <Package className="h-5 w-5" />;
            default: return <AlertCircle className="h-5 w-5" />;
        }
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/admin/orders">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900 font-serif">Order Details</h1>
                    <p className="text-zinc-500 mt-1">Order #{order.id.substring(0, 8)}</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <Card className="border-none shadow-sm">
                        <CardHeader className="border-b border-zinc-50 pb-4">
                            <CardTitle className="text-lg">Items Ordered</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between border-b border-zinc-50 pb-4 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-4">
                                            <div className="h-16 w-16 rounded-md bg-zinc-100 border border-zinc-200 overflow-hidden flex-shrink-0">
                                                {item.productImage?.[0] && (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img src={item.productImage[0]} alt={item.productName || "Product"} className="h-full w-full object-cover" />
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-zinc-900">{item.productName || "Deleted Product"}</h4>
                                                <p className="text-sm text-zinc-500">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="font-medium text-zinc-900">{formatPrice(parseFloat(item.priceAtPurchase) * item.quantity)}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm">
                        <CardHeader className="border-b border-zinc-50 pb-4">
                            <CardTitle className="text-lg">Payment Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500">Subtotal</span>
                                    <span className="text-zinc-900 font-medium">{formatPrice(order.totalAmount)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500">Shipping</span>
                                    <span className="text-emerald-600 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between border-t border-zinc-100 pt-3 mt-3">
                                    <span className="text-lg font-bold text-zinc-900">Total</span>
                                    <span className="text-lg font-bold text-zinc-900">{formatPrice(order.totalAmount)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg">Order Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full bg-zinc-50 ${getStatusColor(order.status)}`}>
                                    {getStatusIcon(order.status)}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-zinc-900 uppercase tracking-wider">{order.status}</p>
                                    <p className="text-xs text-zinc-500">Updated: {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <p className="text-xs font-semibold text-zinc-400 uppercase">Change Status</p>
                                <div className="flex flex-col gap-2">
                                    <UpdateOrderStatusButton orderId={order.id} status="pending" label="Mark as Pending" icon="clock" variant="button" />
                                    <UpdateOrderStatusButton orderId={order.id} status="paid" label="Mark as Paid" icon="check" variant="button" />
                                    <UpdateOrderStatusButton orderId={order.id} status="shipped" label="Mark as Shipped" icon="truck" variant="button" />
                                    <UpdateOrderStatusButton orderId={order.id} status="delivered" label="Mark as Delivered" icon="package" variant="button" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-zinc-200 shadow-none">
                        <CardHeader className="border-b border-zinc-50">
                            <div className="flex items-center gap-2">
                                <Truck className="h-4 w-4 text-zinc-900" />
                                <CardTitle className="text-lg">Logistics & Tracking</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <TrackingForm
                                orderId={order.id}
                                initialTracking={order.trackingNumber}
                                initialCarrier={order.carrier}
                            />
                        </CardContent>
                    </Card>

                    <Card className="border border-zinc-200 shadow-none pt-4 pb-4">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-400">Customer Integrity</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Mail className="h-4 w-4 text-zinc-400 mt-0.5" />
                                <div>
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase">Contact Email</p>
                                    <p className="text-sm text-zinc-900 break-all font-medium leading-tight">{order.guestEmail || "N/A"}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CreditCard className="h-4 w-4 text-zinc-400 mt-0.5" />
                                <div>
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase">Financial Node</p>
                                    <p className="text-sm text-zinc-900 font-mono text-[11px] leading-tight">{order.stripePaymentId || "N/A"}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
