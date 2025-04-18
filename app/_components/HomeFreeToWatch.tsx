'use client'
import { oswald, poppins } from "@/lib/fonts";
import Selector from "./Selector";
import { useState } from "react";
import { motion } from "motion/react"
import { useQuery } from "@tanstack/react-query";
import LoadingImageHome from "./LoadingImageHome";
interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[]; // You can further define this if you have specific genres
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    name: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface Dates {
    maximum: string;
    minimum: string;
}

interface ApiResponse {
    dates: Dates;
    page: number;
    results: Movie[];
}

interface Selectors {
    label: string;
    value: string;
}

const MOVIES = 'movie'
const TV = 'tv'
const selectorArr = [
    {
        label: "Movies",
        value: MOVIES
    },
    {
        label: "TV",
        value: TV
    }
]

const fetchFreeToWatch = async (params: string): Promise<ApiResponse> => {
    const url = `${process.env.NEXT_PUBLIC_TMDB_HOST}discover/${params}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&watch_region=US&with_watch_monetization_types=free`

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
};

export default function HomeFreeToWatch() {
    const [category, setCategory] = useState<string>(MOVIES)

    const { data, isPending } = useQuery<ApiResponse>({
        queryKey: ["products", category], // ✅ React Query refetches when category changes
        queryFn: () => fetchFreeToWatch(category),
        staleTime: 5000, // ✅ Prevents frequent refetching if data is fresh
    });

    const handleChange = () => (value: Selectors) => {
        switch (value.value) {
            case MOVIES:
                setCategory(MOVIES)
                break;

            default:
                setCategory(TV)
                break;
        }
    }
    // if (isPending) {
    //     return <HomePending label="Free To Watch" />
    // }

    // if (isError) {
    //     return <span>Error: {error.message}</span>
    // }
    return (
        <div className="w-full">
            <div className="2xl:max-w-[1280px] mx-auto h-auto lg:flex justify-center-center flex-col" >
                <div className="flex gap-4 lg:px-10 xl:px-10 2xl:px-10 px-4 py-3">
                    <p className={`${oswald.className} text-2xl`}>

                        Free To Watch

                    </p>
                    <Selector data={selectorArr} onChange={handleChange()} />
                </div>
                <div className="relative h-[calc(14rem+4rem)]">

                    <div className="w-full flex overflow-x-auto flex-nowrap lg:space-x-5 xl:space-x-5 2xl:space-x-5 space-x-4 lg:px-10 xl:px-10 2xl:px-10 px-4 h-[calc(14rem+4rem)] overflow-y-hidden">
                        {
                            isPending
                            &&
                            Array.from({ length: 20 }).map((x, y) => (
                                <div key={y} className="w-36 flex-shrink-0 mt-3 space-y-1">
                                    <div className="relative h-56 bg-slate-200 animate-pulse rounded-md">
                                    </div>
                                    <div className=" h-14">
                                        <div className="h-2 bg-slate-200 animate-pulse rounded-md" />
                                    </div>
                                </div>
                            ))
                        }
                        {data && data.results.map((x, y) => (
                            <div key={y} className="w-36 flex-shrink-0 mt-3 space-y-1">
                                <motion.div whileHover={{ scale: 1.05 }} key={y} className="relative h-56">
                                    <LoadingImageHome poster_path={x.poster_path} />
                                </motion.div>
                                <div className=" h-14">
                                    <p className={`${poppins.className} font-bold text-sm line-clamp-2`}>

                                        {x.title || x.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}