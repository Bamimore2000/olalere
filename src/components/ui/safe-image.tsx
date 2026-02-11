"use client";

import { useState, useEffect } from "react";
import NextImage, { ImageProps } from "next/image";
import { ImagePlaceholder } from "./image-placeholder";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
    fallbackName?: string;
    usePlaceholderOnly?: boolean;
}

export function SafeImage({ src, alt, fallbackName, usePlaceholderOnly = false, ...props }: SafeImageProps) {
    const [error, setError] = useState(false);

    // Reset error state when src changes
    useEffect(() => {
        setError(false);
    }, [src]);

    if (error || !src || usePlaceholderOnly) {
        return (
            <div className="relative w-full h-full">
                <ImagePlaceholder name={fallbackName || alt} />
                {/* Maintain same aspect ratio/styling as original container if needed */}
            </div>
        );
    }

    return (
        <NextImage
            src={src}
            alt={alt}
            {...props}
            onError={() => setError(true)}
        />
    );
}
