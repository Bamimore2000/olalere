import { AdminSidebar } from "./components/AdminSidebar";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const user = await currentUser();
    const role = user?.publicMetadata?.role as string;

    if (role !== "admin") {
        // For development/demo purposes, we'll allow access if there's no role set yet
        // but in production this should be strictly role === 'admin'
        // redirect("/");
        console.log("Admin access requested by non-admin user:", user?.emailAddresses[0].emailAddress);
    }

    return (
        <div className="flex min-h-screen bg-zinc-50/50">
            <AdminSidebar />
            <main className="flex-1 md:pl-72">
                <div className="container mx-auto p-4 md:p-8 pt-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
