import Image from "next/image"
import { useState } from "react";

interface LoadingImageHomeLatestTrailerProps {
    backdrop_path: string
}
export default function LoadingImageHomeLatestTrailer({ backdrop_path }: LoadingImageHomeLatestTrailerProps) {
    const [loading, setLoading] = useState(true);
    return (
        <div key={backdrop_path} className={`h-40 relative ${loading ? "bg-slate-200 animate-pulse rounded-md" : "opacity-100"}`}>
            <Image
                loading="lazy"
                src={`https://image.tmdb.org/t/p/w355_and_h200_smart${backdrop_path}`} // Replace with your dynamic poster path
                alt="Movie Poster"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`object-cover rounded-md transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}
                onLoad={() => setLoading(false)}
            />
        </div>
    )
}