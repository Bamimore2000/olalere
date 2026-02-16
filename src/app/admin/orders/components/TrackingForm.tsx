"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Truck, Save, ExternalLink } from "lucide-react";
import { updateOrderTracking } from "../../actions";
import { useRouter } from "next/navigation";

interface TrackingFormProps {
    orderId: string;
    initialTracking?: string | null;
    initialCarrier?: string | null;
}

export function TrackingForm({ orderId, initialTracking, initialCarrier }: TrackingFormProps) {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);

        const formData = new FormData(e.currentTarget);
        const trackingNumber = formData.get("trackingNumber") as string;
        const carrier = formData.get("carrier") as string;

        try {
            await updateOrderTracking(orderId, { trackingNumber, carrier });
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Failed to update tracking.");
        } finally {
            setIsPending(false);
        }
    };

    const getTrackingUrl = () => {
        if (!initialTracking) return null;
        const c = initialCarrier?.toLowerCase() || "";
        if (c.includes("dhl")) return `https://www.dhl.com/en/express/tracking.html?AWB=${initialTracking}`;
        if (c.includes("fedex")) return `https://www.fedex.com/apps/fedextrack/?tracknumbers=${initialTracking}`;
        if (c.includes("ups")) return `https://www.ups.com/track?tracknum=${initialTracking}`;
        return null;
    };

    const trackingUrl = getTrackingUrl();

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="carrier" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Carrier</Label>
                <Input
                    id="carrier"
                    name="carrier"
                    placeholder="e.g., DHL, FedEx"
                    defaultValue={initialCarrier || ""}
                    className="h-9 border-zinc-200"
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="trackingNumber" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Tracking Number</Label>
                <Input
                    id="trackingNumber"
                    name="trackingNumber"
                    placeholder="Enter tracking ID"
                    defaultValue={initialTracking || ""}
                    className="h-9 border-zinc-200"
                />
            </div>

            {trackingUrl && (
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 h-8"
                    type="button"
                    asChild
                >
                    <a href={trackingUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-2" />
                        Live Track Transit
                    </a>
                </Button>
            )}

            <Button type="submit" disabled={isPending} className="w-full h-10 gap-2 shadow-sm font-bold uppercase tracking-widest text-[10px]">
                <Save className="h-4 w-4" />
                {isPending ? "Syncing..." : "Update Logistics"}
            </Button>
        </form>
    );
}
