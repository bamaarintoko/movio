'use client'
import { oswald, poppins } from "@/lib/fonts";
import Selector from "./Selector";
import { useState } from "react";
import { motion } from "motion/react";
import { useRouter } from 'next/navigation'
import { slugformatter } from "@/lib/functions";
import LoadingImageHome from "./LoadingImageHome";
import { useQuery } from "@tanstack/react-query";

type Movie = {
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
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface Selectors {
    label: string;
    value: string;
}

interface ApiResponse {
    page: number;
    results: Movie[];
}

const arrSelector = [
    {
        label: 'Today',
        value: 'day'
    },
    {
        label: 'This Week',
        value: 'week'
    }
]
const TODAY = 'day'
const THISWEEK = 'week'

const fetchHomeTrending = async (params: string): Promise<ApiResponse> => {
    const url = `${process.env.NEXT_PUBLIC_TMDB_HOST}trending/movie/${params}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
};

export default function HomeTrending() {
    const [category, setCategory] = useState<string>(TODAY)
    const router = useRouter()

    const { data, isPending, error, isError } = useQuery<ApiResponse>({
        queryKey: ["products", category], // ✅ React Query refetches when category changes
        queryFn: () => fetchHomeTrending(category),
        staleTime: 5000, // ✅ Prevents frequent refetching if data is fresh
    });

    // useEffect(() => {
    //     setPopularMovies(data)
    //     console.log('data : ', data)
    // }, [data])

    // const syncPopular = async (params: Selectors) => {
    //     try {

    //         const response = await fetch(`${process.env.NEXT_PUBLIC_TMDB_HOST}trending/movie/${params.value}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
    //         const data: ApiResponse = await response.json();
    //         setPopularMovies(data.results)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const handleChange = () => (value: Selectors) => {
        switch (value.value) {
            case TODAY:
                setCategory(TODAY)
                break;
            default:
                setCategory(THISWEEK)
                break;
        }
        // console.log(value)
        // setInputValue(value); // Update the input value state
        // syncPopular(value); // Call syncPopular with the value
    };

    const handleDetail = (id: number, title: string) => {
        const newId = id + "-" + slugformatter(title)
        console.log('id : ', newId)
        router.push(`movie/${newId}`)
    }
    // if (isPending) {
    //     return <HomePending label="Trending" />
    // }

    if (isError) {
        return <span>Error: {error.message}</span>
    }
    // const data : ApiResponse = datas
    // console.log('dataaaaa : ',data)
    return (
        <div className="w-full">
            <div className="2xl:max-w-[1280px] mx-auto lg:flex justify-center-center flex-col" >
                <div className="flex gap-4 lg:px-10 xl:px-10 2xl:px-10 px-4 py-3">
                    <p className={`${oswald.className} text-2xl`}>

                        Trending
                    </p>
                    <Selector data={arrSelector} onChange={handleChange()} />
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
                        {!isPending && data.results.map((x, y) => (
                            <div onClick={() => handleDetail(x.id, x.title)} key={y} className="w-36 flex-shrink-0 mt-3 space-y-1 cursor-pointer">
                                <motion.div whileHover={{ scale: 1.05 }} key={y} className="relative h-56">
                                    <LoadingImageHome poster_path={x.poster_path} />
                                </motion.div>
                                <div className=" h-14">
                                    <p className={`${poppins.className} font-bold text-sm line-clamp-2`}>

                                        {x.title}
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