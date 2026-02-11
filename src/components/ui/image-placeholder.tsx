"use client";

import { ImageIcon } from "lucide-react";

export function ImagePlaceholder({ name }: { name?: string }) {
    return (
        <div className="w-full h-full bg-zinc-100 flex flex-col items-center justify-center p-4 text-zinc-400 space-y-2 select-none">
            <ImageIcon className="w-8 h-8 opacity-20" />
            <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-30">Borokini</span>
                {name && (
                    <span className="text-[9px] text-center line-clamp-1 opacity-40 px-2">{name}</span>
                )}
            </div>
            <div className="absolute inset-0 border border-zinc-200/50 pointer-events-none" />
        </div>
    );
}
