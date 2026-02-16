import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1588444837495-c6cfaf504620?q=80&w=2670&auto=format&fit=crop"
                        className="w-full h-full object-cover brightness-[0.4]"
                        alt="Jewelry crafting"
                    />
                </div>
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tighter mb-4">Legacy of Elegance</h1>
                    <p className="font-light tracking-[0.3em] uppercase text-zinc-300">The Borokini Story</p>
                </div>
            </section>

            {/* Content Section */}
            <section className="container mx-auto px-4 py-20 max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="font-serif text-3xl font-bold text-zinc-900 tracking-tight italic">Born from Culture, Crafted for Luxury</h2>
                        <p className="text-zinc-600 leading-relaxed font-light">
                            In the heart of Nigeria, "BOROKINI" isn't just a name; it's a title of distinction. It represents a person of means, taste, and unparalleled class.
                            Founded with the vision to bring indigenous luxury to the global stage, Borokini Luxury Jewelry combines centuries-old craftsmanship with modern, minimal aesthetics.
                        </p>
                        <p className="text-zinc-600 leading-relaxed font-light">
                            Every piece in our collection is hand-selected and ethically sourced, ensuring that our legacy remains as pure as the gold we craft.
                        </p>
                    </div>
                    <div className="aspect-[4/5] relative rounded-sm overflow-hidden shadow-2xl border-8 border-zinc-50 translate-y-4">
                        <SafeImage
                            src="https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=2574&auto=format&fit=crop"
                            alt="Gold Necklace Close-up"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="bg-zinc-50 py-20">
                <div className="container mx-auto px-4 text-center max-w-2xl">
                    <h2 className="font-serif text-4xl font-bold mb-12 tracking-tight">Our Philosophy</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            <div className="h-0.5 w-12 bg-primary mx-auto" />
                            <h3 className="font-bold text-sm uppercase tracking-widest">Purity</h3>
                            <p className="text-xs text-zinc-500 font-light leading-relaxed">Only the finest certified 18k and 24k gold touches our workshop benches.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="h-0.5 w-12 bg-primary mx-auto" />
                            <h3 className="font-bold text-sm uppercase tracking-widest">Heritage</h3>
                            <p className="text-xs text-zinc-500 font-light leading-relaxed">Designing with the weight of tradition and the lightness of modern trends.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="h-0.5 w-12 bg-primary mx-auto" />
                            <h3 className="font-bold text-sm uppercase tracking-widest">Exclusivity</h3>
                            <p className="text-xs text-zinc-500 font-light leading-relaxed">Limited release collections that ensure your statement remains yours alone.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-24 text-center">
                <h2 className="font-serif text-3xl font-bold mb-8">Ready to define your legacy?</h2>
                <Link href="/shop">
                    <Button size="lg" className="px-12 h-14 uppercase tracking-widest font-bold">
                        Explore the Collection
                    </Button>
                </Link>
            </section>
        </div>
    );
}
