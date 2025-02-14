'use client'
import Image from "next/image";
import { useState } from "react";
type LoadingImageProps = {
    profile_path: string | null
}

export default function LoadingImageMobile({ profile_path }: LoadingImageProps) {
    const [loading, setLoading] = useState(true);
    return (
        <div key={profile_path} className={`${loading ? "bg-slate-300 animate-pulse rounded-md" : "opacity-100"}`}>
            <Image
                priority
                src={`https://image.tmdb.org/t/p/w235_and_h235_smart${profile_path}`} // Replace with your dynamic poster path
                alt="Movie Poster"
                width={165}
                height={165}
                className={`rounded-md transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onLoad={() => setLoading(false)}
            />
        </div>
    )
}