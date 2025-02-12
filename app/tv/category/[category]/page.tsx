'use client'
import HomeHeader from "@/app/_components/HomeHeader";
import { poppins } from "@/lib/fonts";
import { replaceHyphens } from "@/lib/functions";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface TvShow {
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
    results: TvShow[];
}

const POPULAR = 'popular'
const AIRINGTODAY = 'airing-today'
const ONTHEAIR = 'on-the-air'
const TOPRATED = 'top-rated'

export default function PageTv() {
    const [tvShows, setTvShows] = useState<TvShow[]>([])
    const params = useParams()
    // const {category} = router.query
    const objCat = {
        popular: 'Popular Tv Shows',
        airing_today: 'TV Shows Airing Today',
        on_the_air: 'Currently Airing TV Shows',
        top_rated: 'Top Rated TV Shows'
    } as const

    const category = params?.category as string
    const result = replaceHyphens(category) as keyof typeof objCat

    useEffect(() => {
        switch (category) {
            case POPULAR:
                fetchTvShows(POPULAR)
                break;
            case AIRINGTODAY:
                fetchTvShows(replaceHyphens(AIRINGTODAY))
                break;
            case ONTHEAIR:
                fetchTvShows(replaceHyphens(ONTHEAIR))
                break;
            case TOPRATED:
                fetchTvShows(replaceHyphens(TOPRATED))
                break;
            default:
                break;
        }
        // fetchMovie()
        console.log('category : ', category)
    }, [category])

    const fetchTvShows = async (endpoint: string = POPULAR) => {
        console.log('endpoint : ', endpoint)
        try {
            const tvShowResponse = await fetch(`${process.env.NEXT_PUBLIC_TMDB_HOST}tv/${endpoint}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`)
            const tvShowData : ApiResponse = await tvShowResponse.json()
            console.log('movieData : ', tvShowData)
            if (tvShowResponse.ok) {
                // console.log('--- ', moviewData.results)
                setTvShows(tvShowData.results)
            }
        } catch (error) {
            console.log('error : ', error)
        }
    }
    return (
        <div>
            <div className=" sticky top-0 z-20">
                <HomeHeader />
            </div>
            <div className="2xl:max-w-[1280px] mx-auto lg:px-10 xl:px-10 px-4" >
                <div className="py-6">
                    <p className={`${poppins.className} text-2xl`}>
                        {objCat[result]}

                    </p>
                </div>
                {/* desktop */}
                <div className="lg:grid xl:grid grid-cols-[260px_1fr] min-h-screen gap-8 hidden">
                    {/* Sidebar Filter */}
                    <aside className="bg-gray-100 p-4 ">
                    </aside>

                    {/* Content Section */}
                    <main className="grid grid-cols-5 gap-8">
                        {
                            tvShows.map((x, y) => (

                                <div key={y} className="bg-white h-[337px] shadow-md rounded-md">
                                    <div className="relative h-[237px]">
                                        <Image
                                            priority
                                            src={`https://image.tmdb.org/t/p/w220_and_h330_smart${x.poster_path}`} // Replace with your dynamic poster path
                                            alt="Movie Poster"
                                            fill
                                            style={{ objectFit: "cover" }}
                                            className="object-cover rounded-t-md"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                    <div className="px-2 pt-4">
                                        <p className={`${poppins.className} font-bold text-sm`}>{x.name}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </main>
                </div>
                {/* mobile */}
                <div className=" lg:hidden xl:hidden space-y-4">
                    {
                        tvShows.map((x, y) => (
                            <div key={y} className="h-[141px] flex flex-row shadow-md rounded-r-md">
                                <div className="w-[94px] bg-white h-full relative">
                                    <Image
                                        priority
                                        src={`https://image.tmdb.org/t/p/w220_and_h330_smart${x.poster_path}`} // Replace with your dynamic poster path
                                        alt="Movie Poster"
                                        fill
                                        style={{ objectFit: "cover" }}
                                        className="object-cover rounded-l-md"
                                    />
                                </div>
                                <div className="flex-1 px-2  justify-center flex flex-col">
                                    <div className="mb-2">

                                        <p className={`${poppins.className} font-medium`}>{x.name}</p>
                                        <p>{x.release_date}</p>
                                    </div>
                                    <p className={`${poppins.className} line-clamp-2 text-sm`}>{x.overview}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}