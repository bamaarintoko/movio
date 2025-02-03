'use client'
import { oswald, poppins } from "@/lib/fonts";
import Selector from "./Selector";
import Image from "next/image";
import { useEffect, useState } from "react";

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
export default function HomePopular() {
    const [populars, setPopulars] = useState<Movie[]>([])
    // const res = await fetch(`${process.env.NEXT_PUBLIC_TMDB_HOST}movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
    // const data: ApiResponse = await res.json();

    useEffect(() => {
        fetchApi('movie', 8)
    }, [])

    const handleChange = () => (value: Selectors) => {
        switch (value.value) {
            case STREAMING:
                fetchApi('movie', 8)
                break;
            case ONTV:
                fetchApi('tv', 15)
                break;
            case FORRENT:
                fetchApi('movie', 10)
                break;
            default:
                fetchInTheaters()
                break;
        }
    }

    const fetchApi = async (params: string, providers: number) => {
        console.log('params : ', params)
        console.log('providers : ', providers)
        try {
            const moviesResponse = await fetch(`${process.env.NEXT_PUBLIC_TMDB_HOST}discover/${params}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&with_watch_providers=${providers}&watch_region=US`);
            const movieData: ApiResponse = await moviesResponse.json()
            if (moviesResponse.ok) {
                // console.log('----- ', movieData.results)
                setPopulars(movieData.results)
            }
            // console.log("movieData : ", movieData)
        } catch (error) {
            console.log('error : ', error)
        }
    }

    const fetchInTheaters = async () => {
        try {
            const theatersResponse = await fetch(`${process.env.NEXT_PUBLIC_TMDB_HOST}movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`)
            const theatersData: ApiResponse = await theatersResponse.json()
            if (theatersResponse.ok) {
                setPopulars(theatersData.results)
            }
            // console.log('theatersData : ', theatersData)
        } catch (error) {
            console.log('error : ', error)
        }
    }
    return (
        <div className="w-full">
            <div className="2xl:max-w-[1280px] mx-auto h-auto lg:flex justify-center-center flex-col" >
                <div className="flex gap-4 lg:px-10 xl:px-10 2xl:px-10 px-4 py-6">
                    <p className={`${oswald.className} text-2xl`}>

                        What&apos;s Popular
                    </p>
                    <Selector data={selectorArr} onChange={handleChange()} />
                </div>
                <div>

                    <div className="w-full flex overflow-x-auto flex-nowrap space-x-5 lg:px-10 xl:px-10 2xl:px-10 px-4">
                        {populars.map((x, y) => (
                            <div key={y} className="w-36 flex-shrink-0">
                                <div key={y} className="relative">
                                    <Image
                                        priority
                                        src={`https://image.tmdb.org/t/p/w220_and_h330_smart${x.poster_path}`} // Replace with your dynamic poster path
                                        alt="Movie Poster"
                                        width={150} // TMDB size
                                        height={225} // Maintain aspect ratio (300:450)
                                        className="object-cover rounded-md"
                                    />
                                </div>
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