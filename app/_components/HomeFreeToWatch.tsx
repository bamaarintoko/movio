'use client'
import { oswald, poppins } from "@/lib/fonts";
import Selector from "./Selector";
import { useEffect, useState } from "react";
import { motion } from "motion/react"
import Image from "next/image";
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


export default function HomeFreeToWatch() {
    const [freeMovie, setFreeMovie] = useState<Movie[]>([])
    useEffect(() => {
        fetchApi(MOVIES)
    }, [])

    const handleChange = () => (value: Selectors) => {
        switch (value.value) {
            case MOVIES:
                fetchApi(MOVIES)
                break;

            default:
                fetchApi(TV)
                break;
        }
    }

    const fetchApi = async (params: string) => {
        try {
            // console.log('params : ', params)
            const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_TMDB_HOST}discover/${params}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&watch_region=US&with_watch_monetization_types=free`)
            const dataResponse: ApiResponse = await fetchResponse.json()
            // console.log('dataResponse : ', dataResponse)
            if (fetchResponse.ok) {
                setFreeMovie(dataResponse.results)
            }
        } catch (error) {
            console.log('error : ', error)
        }
    }
    return (
        <div className="w-full">
            <div className="2xl:max-w-[1280px] mx-auto h-auto lg:flex justify-center-center flex-col" >
                <div className="flex gap-4 px-10 py-6">
                    <p className={`${oswald.className} text-2xl`}>

                        Free To Watch

                    </p>
                    <Selector data={selectorArr} onChange={handleChange()} />
                </div>
                <div className="relative h-[calc(14rem+4rem)]">
                    {
                        freeMovie.length > 0
                        &&
                        <div className="w-full flex overflow-x-auto flex-nowrap lg:space-x-5 xl:space-x-5 2xl:space-x-5 space-x-4 lg:px-10 xl:px-10 2xl:px-10 px-4 h-[calc(14rem+4rem)] overflow-y-hidden">
                            {freeMovie.map((x, y) => (
                                <div key={y} className="w-36 flex-shrink-0 mt-3 space-y-1">
                                    <motion.div whileHover={{ scale: 1.05 }} key={y} className="relative h-56">
                                        <Image
                                            priority
                                            src={`https://image.tmdb.org/t/p/w220_and_h330_smart${x.poster_path}`} // Replace with your dynamic poster path
                                            alt="Movie Poster"
                                            fill
                                            style={{ objectFit: "cover" }}
                                            className="object-cover rounded-md"
                                        />
                                    </motion.div>
                                    <div className=" h-14">
                                        <p className={`${poppins.className} font-bold text-sm line-clamp-2`}>

                                            {x.title || x.name}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
                {/* <div>
        
                            <div className="w-full flex overflow-x-auto flex-nowrap space-x-5 px-10">
                                {data.results.map((x, y) => (
                                    <div key={y} className="w-36 flex-shrink-0">
                                        <div key={y} className="relative">
                                            <Image
                                                priority
                                                src={`https://image.tmdb.org/t/p/w220_and_h330_smart${x.poster_path}`} // Replace with your dynamic poster path
                                                alt="Movie Poster"
                                                width={150} // TMDB size
                                                height={225} // Maintain aspect ratio (300:450)
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className={`${poppins.className} font-bold text-[16px]`}>
        
                                                {x.title}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div> */}
            </div>
        </div>
    )
}