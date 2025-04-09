'use client'
import { oswald, poppins } from "@/lib/fonts";
import Selector from "./Selector";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react"
import LoadingImageHome from "./LoadingImageHome";
import { slugformatter } from "@/lib/functions";
import { useRouter } from "next/navigation";

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

const STREAMING = 'streaming'
const ONTV = 'on_tv'
const FORRENT = "for_rent"
const INTHEATERS = 'in_theaters'
const selectorArr = [
    {
        label: "Streaming",
        value: STREAMING
    },
    {
        label: "On TV",
        value: ONTV
    },
    {
        label: "For Rent",
        value: FORRENT
    },
    {
        label: "In Theaters",
        value: INTHEATERS
    }
]

const fetchHomePopular = async (endpoint: string): Promise<ApiResponse> => {
    const url = `${endpoint}`

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
};

export default function HomePopular() {
    const [endpoint, setEndpoint] = useState<string>(`${process.env.NEXT_PUBLIC_TMDB_HOST}discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&with_watch_providers=8&watch_region=US`)
    const router = useRouter()

    const { data, isPending, error, isError } = useQuery<ApiResponse>({
        queryKey: ["endpoint", endpoint], // ✅ React Query refetches when category changes
        queryFn: () => fetchHomePopular(endpoint),
        staleTime: 5000, // ✅ Prevents frequent refetching if data is fresh
    });

    const handleChange = () => (value: Selectors) => {
        switch (value.value) {
            case STREAMING:
                setEndpoint(`${process.env.NEXT_PUBLIC_TMDB_HOST}discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&with_watch_providers=8&watch_region=US`)
                break;
            case ONTV:
                setEndpoint(`${process.env.NEXT_PUBLIC_TMDB_HOST}discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&with_watch_providers=15&watch_region=US`)
                break;
            case FORRENT:
                setEndpoint(`${process.env.NEXT_PUBLIC_TMDB_HOST}discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&with_watch_providers=10&watch_region=US`)
                break;
            default:
                setEndpoint(`${process.env.NEXT_PUBLIC_TMDB_HOST}movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`)
                break;
        }
    }

    const handleDetail = (id: number, title: string) => {
        const newId = id + "-" + slugformatter(title)
        console.log('id : ', newId)
        router.push(`movie/${newId}`)
    }

    // if (isPending) {
    //     return <HomePending label="What&apos;s Popular" />
    // }

    // if (isError) {
    //     return <span>Error: {error.message}</span>
    // }

    return (
        <div className="w-full">
            <div className="2xl:max-w-[1280px] mx-auto h-auto lg:flex justify-center-center flex-col" >
                <div className="flex gap-4 lg:px-10 xl:px-10 2xl:px-10 px-4 py-3">
                    <p className={`${oswald.className} text-2xl`}>

                        What&apos;s Popular
                    </p>
                    <Selector data={selectorArr} onChange={handleChange()} />
                </div>
                <div>

                    <div className="w-full flex overflow-x-auto flex-nowrap space-x-5 lg:px-10 xl:px-10 2xl:px-10 px-4">
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
                            <div onClick={() => handleDetail(x.id, x.title)} key={y} className="w-36 flex-shrink-0 mt-3 space-y-1 cursor-pointer">
                                <motion.div whileHover={{ scale: 1.05 }} key={y} className="relative h-56">
                                    <LoadingImageHome poster_path={x.poster_path} />
                                </motion.div>
                                <div>
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