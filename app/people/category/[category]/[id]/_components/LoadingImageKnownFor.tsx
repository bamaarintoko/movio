'use client'
import Image from "next/image";
import { useState } from "react";
type LoadingImageKnownForProps = {
    poster_path: string | null
}
export default function LoadingImageKnownFor({ poster_path }: LoadingImageKnownForProps) {
    const [loading, setLoading] = useState(true);
    return (
        <div key={poster_path} className={`h-[195px] w-[130px] ${loading ? "bg-slate-200 animate-pulse rounded-md" : "opacity-100"}`}>
            <Image
                priority
                src={`https://image.tmdb.org/t/p/w300_and_h450_smart${poster_path}`}
                alt={'movie'}
                height={195}
                width={130}
                className={`rounded-md transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}
                onLoad={() => setLoading(false)}
            />
        </div>
    )
}