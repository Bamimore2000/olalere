"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "@/app/admin/actions";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { CheckCircle, Clock, Truck, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UpdateOrderStatusButtonProps {
    orderId: string;
    status: string;
    label: string;
    icon: "clock" | "check" | "truck" | "package";
    variant?: "dropdown" | "button";
}

export function UpdateOrderStatusButton({
    orderId,
    status,
    label,
    icon,
    variant = "dropdown"
}: UpdateOrderStatusButtonProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleUpdate = async () => {
        startTransition(async () => {
            await updateOrderStatus(orderId, status);
            router.refresh();
        });
    };

    const IconComponent = {
        clock: Clock,
        check: CheckCircle,
        truck: Truck,
        package: Package
    }[icon];

    if (variant === "button") {
        return (
            <Button
                variant="outline"
                size="sm"
                className="flex items-center justify-start gap-2 cursor-pointer w-full text-zinc-600 hover:text-zinc-900 border-zinc-200"
                onClick={handleUpdate}
                disabled={isPending}
            >
                <IconComponent className={cn("h-4 w-4",
                    status === 'paid' ? 'text-emerald-500' :
                        status === 'pending' ? 'text-amber-500' :
                            status === 'shipped' ? 'text-blue-500' : 'text-zinc-500'
                )} />
                {isPending ? "Updating..." : label}
            </Button>
        );
    }

    return (
        <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleUpdate}
            disabled={isPending}
        >
            <IconComponent className={cn("h-4 w-4",
                status === 'paid' ? 'text-emerald-500' :
                    status === 'pending' ? 'text-amber-500' :
                        status === 'shipped' ? 'text-blue-500' : 'text-zinc-500'
            )} />
            {isPending ? "Updating..." : label}
        </DropdownMenuItem>
    );
}
