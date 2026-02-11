import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
    return (
        <footer className="w-full border-t bg-background py-1 md:py-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link href="/">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/logo.svg"
                                alt="Borokini Luxury Jewelry"
                                className="h-6 w-auto brightness-0 invert"
                            />
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Crafting timeless elegance for the modern individual. Ethically sourced, meticulously designed.
                        </p>
                    </div>

                    {/* Shop Column */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-sm uppercase tracking-wider">Shop</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/shop/necklaces" className="hover:text-primary transition-colors">Necklaces</Link></li>
                            <li><Link href="/shop/rings" className="hover:text-primary transition-colors">Rings</Link></li>
                            <li><Link href="/shop/earrings" className="hover:text-primary transition-colors">Earrings</Link></li>
                            <li><Link href="/shop/bracelets" className="hover:text-primary transition-colors">Bracelets</Link></li>
                            <li><Link href="/shop/watches" className="hover:text-primary transition-colors">Watches</Link></li>
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-sm uppercase tracking-wider">Support</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                            <li><Link href="/care" className="hover:text-primary transition-colors">Jewelry Care</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-sm uppercase tracking-wider">Newsletter</h4>
                        <p className="text-sm text-muted-foreground">
                            Subscribe to receive updates, access to exclusive deals, and more.
                        </p>
                        <div className="flex flex-col gap-2">
                            <Input type="email" placeholder="Enter your email" className="bg-secondary/50 border-transparent focus:bg-background transition-colors" />
                            <Button className="w-full">Subscribe</Button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Borokini Jewelry. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
