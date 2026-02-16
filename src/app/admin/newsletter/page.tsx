import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { desc, count } from "drizzle-orm";
import { Mail, UserPlus, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function NewsletterPage() {
    const subscribers = await db.query.newsletterSubscribers.findMany({
        orderBy: [desc(newsletterSubscribers.createdAt)],
    });

    const [totalCount] = await db.select({ value: count() }).from(newsletterSubscribers);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-8">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-900 font-serif">Diplomatic Cable</h1>
                    <p className="text-zinc-500 mt-2 font-medium">Collective communication management & member sync.</p>
                </div>
                <div className="flex items-center gap-4 bg-zinc-900 text-white px-4 py-2 rounded-lg shadow-sm">
                    <UserPlus className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">{totalCount.value} Global Members</span>
                </div>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-zinc-50/50 border-b border-zinc-200">
                            <tr>
                                <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px] text-zinc-500">Member Email</th>
                                <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px] text-zinc-500">Status</th>
                                <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px] text-zinc-500">Archived Date</th>
                                <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px] text-zinc-500 text-right">Settings</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 font-medium">
                            {subscribers.map((sub) => (
                                <tr key={sub.id} className="hover:bg-zinc-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200">
                                                <Mail className="h-4 w-4 text-zinc-400" />
                                            </div>
                                            <span className="text-zinc-900 font-bold">{sub.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {sub.isVerified ? (
                                                <>
                                                    <CheckCircle className="h-3 w-3 text-emerald-500" />
                                                    <span className="text-[10px] font-bold text-emerald-600 uppercase">Verified</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Clock className="h-3 w-3 text-amber-500" />
                                                    <span className="text-[10px] font-bold text-amber-600 uppercase">Pending</span>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-zinc-400 font-bold text-[10px] uppercase">
                                        {new Date(sub.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-500 hover:bg-red-50">
                                            Revoke Access
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {subscribers.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="py-20 text-center text-zinc-400 font-bold uppercase tracking-widest text-xs">
                                        Collective empty. Awaiting diplomatic ties.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
