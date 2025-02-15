'use client'
import Image from "next/image";
import { useState } from "react";

interface LoadingImageHomeProps {
    poster_path: string
}
export default function LoadingImageHome({ poster_path }: LoadingImageHomeProps) {
    const [loading, setLoading] = useState(true);
    return (
        <div key={poster_path} className={`h-56 ${loading ? "bg-slate-200 animate-pulse rounded-md" : "opacity-100"}`}>
            <Image
                priority
                src={`https://image.tmdb.org/t/p/w220_and_h330_smart${poster_path}`} // Replace with your dynamic poster path
                alt="Movie Poster"
                fill
                style={{ objectFit: "cover" }}
                className={`object-cover rounded-md transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}
                onLoad={() => setLoading(false)}
            />
        </div>
    )
}