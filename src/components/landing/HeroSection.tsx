'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AddToCart } from '@/components/cart/add-to-cart';

export function HeroSection() {
    return (
        <section className="relative h-[60vh] md:h-[70vh] w-full bg-zinc-900 flex items-center justify-center overflow-hidden">
            {/* Background with overlay */}
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* Background Media */}
            <div className="absolute inset-0 z-0 h-full w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2669&auto=format&fit=crop"
                    alt="Luxury Jewelry Background"
                    className="w-full h-full object-cover opacity-60 brightness-[0.7]"
                />
            </div>

            <div className="relative z-20 container px-4 md:px-6 text-center text-white space-y-6 max-w-5xl">
                <div className="space-y-2">
                    <motion.span
                        className="inline-block text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-zinc-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        Handcrafted Excellence
                    </motion.span>
                    <motion.h1
                        className="font-serif text-3xl md:text-6xl font-medium tracking-tight text-white leading-[1.2]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Borokini Luxury <br className="hidden md:block" /> Timeless Elegance
                    </motion.h1>
                </div>

                <motion.p
                    className="text-sm md:text-lg text-zinc-300 max-w-2xl mx-auto font-light tracking-wide leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Discover our curated collection of ethically sourced jewelry designed for the modern connoisseur.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <Link href="/shop" className="w-full sm:w-auto">
                        <Button size="lg" className="w-full sm:min-w-[180px] h-12 bg-primary text-white hover:bg-primary/90 font-bold tracking-widest rounded-sm uppercase text-xs transition-all duration-300">
                            SHOP NOW
                        </Button>
                    </Link>

                    <Link href="/collections" className="w-full sm:w-auto">
                        <Button size="lg" variant="outline" className="w-full sm:min-w-[180px] h-12 border-white/30 text-white hover:bg-white/10 hover:text-white font-semibold tracking-wider rounded-sm bg-transparent transition-all duration-300 uppercase text-xs">
                            VIEW COLLECTIONS
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
