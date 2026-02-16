import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-4">
            <div className="max-w-md w-full text-center space-y-6">
                <h1 className="font-serif text-8xl font-bold text-primary tracking-tighter">404</h1>
                <div className="space-y-2">
                    <h2 className="font-serif text-2xl uppercase tracking-widest text-zinc-900">Page Not Found</h2>
                    <p className="text-zinc-500 font-light">
                        The masterpiece you're looking for doesn't exist or has been moved to our private collection.
                    </p>
                </div>
                <div className="pt-4">
                    <Link href="/">
                        <Button size="lg" className="w-full sm:w-auto uppercase tracking-widest font-bold">
                            Return Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
