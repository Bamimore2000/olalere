import { db } from "@/db";
import Link from "next/link";
import { orders } from "@/db/schema";
import { desc } from "drizzle-orm";
import { formatPrice } from "@/lib/utils";
import { Clock, Eye, MoreHorizontal, Package, CheckCircle, Truck, AlertCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UpdateOrderStatusButton } from "./components/UpdateOrderStatusButton";

export default async function OrdersPage() {
    const allOrders = await db.query.orders.findMany({
        orderBy: [desc(orders.createdAt)],
    });

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'paid': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'delivered': return 'bg-zinc-100 text-zinc-700 border-zinc-200';
            default: return 'bg-zinc-100 text-zinc-700 border-zinc-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'paid': return <CheckCircle className="h-3 w-3" />;
            case 'pending': return <Clock className="h-3 w-3" />;
            case 'shipped': return <Truck className="h-3 w-3" />;
            case 'delivered': return <Package className="h-3 w-3" />;
            default: return <AlertCircle className="h-3 w-3" />;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 font-serif">Orders</h1>
                <p className="text-zinc-500 mt-1">Track and manage customer orders.</p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-zinc-50/50 border-b border-zinc-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-zinc-900">Order ID</th>
                                <th className="px-6 py-4 font-semibold text-zinc-900">Customer</th>
                                <th className="px-6 py-4 font-semibold text-zinc-900">Date</th>
                                <th className="px-6 py-4 font-semibold text-zinc-900">Total</th>
                                <th className="px-6 py-4 font-semibold text-zinc-900">Status</th>
                                <th className="px-6 py-4 font-semibold text-zinc-900 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {allOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-zinc-50/50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs text-zinc-500">
                                        #{order.id.substring(0, 8)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-zinc-900">
                                            {order.guestEmail || "Registered User"}
                                        </div>
                                        <div className="text-xs text-zinc-500">
                                            {order.userId ? `ID: ${order.userId.substring(0, 8)}...` : "Guest Checkout"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-zinc-600">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-zinc-900">
                                        {formatPrice(order.totalAmount)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold border ${getStatusColor(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            {order.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-[180px]">
                                                <DropdownMenuLabel>Order Management</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem asChild className="flex items-center gap-2 cursor-pointer">
                                                    <Link href={`/admin/orders/${order.id}`} className="flex items-center gap-2 w-full">
                                                        <Eye className="h-4 w-4" />
                                                        View Details
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuLabel className="text-[10px] uppercase text-zinc-400">Update Status</DropdownMenuLabel>
                                                <UpdateOrderStatusButton orderId={order.id} status="pending" label="Mark as Pending" icon="clock" />
                                                <UpdateOrderStatusButton orderId={order.id} status="paid" label="Mark as Paid" icon="check" />
                                                <UpdateOrderStatusButton orderId={order.id} status="shipped" label="Mark as Shipped" icon="truck" />
                                                <UpdateOrderStatusButton orderId={order.id} status="delivered" label="Mark as Delivered" icon="package" />
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {allOrders.length === 0 && (
                    <div className="py-20 text-center text-zinc-500 border-t">
                        <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-10" />
                        <p>No orders found yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
