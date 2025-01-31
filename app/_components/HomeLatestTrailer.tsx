'use client'
import { oswald, poppins } from "@/lib/fonts";
import Image from "next/image";
import Selector from "./Selector";
import { useEffect, useState } from "react";
import { PhotoIcon } from "@heroicons/react/20/solid";

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
    video: boolean;
    title: string;
    name: string;
    vote_average: number;
    vote_count: number;
}

interface Show {
    adult: boolean;
    backdrop_path: string;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
}

interface Dates {
    maximum: string;
    minimum: string;
}
interface ApiShowResponse {
    page: number;
    results: Show[];
    total_pages: number;
    total_results: number;
}
interface ApiResponse {
    dates: Dates;
    page: number;
    results: Movie[];
}
interface Video {
    type: string;
    site: string;
}

interface Trailers {
    title: string;
    trailer_url: string;
    backdrop_path: string;
}

interface Selectors {
    label: string;
    value: string;
}
const POPULAR = 'popular'
const STREAMING = 'streaming'
const ONTV = 'on_tv'
const FORRENT = "for_rent"
const INTHEATERS = 'in_theaters'
const selectorArr = [
    {
        label: "Popular",
        value: POPULAR
    },
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
export default function HomeLatestTrailer() {
    const [trailers, setTrailers] = useState<Trailers[]>([])
    // console.log('moviesResponse : ', movies)

    useEffect(() => {
        syncPopular()
    }, [])

    const handleChange = () => (value: Selectors) => {
        switch (value.value) {
            case POPULAR:
                syncPopular()
                break;
            case STREAMING:
                syncStreaming()
                break;
            case ONTV:
                syncOnTv()
                break;
            case FORRENT:
                syncForRent()
                break;
            case INTHEATERS:
                syncInTheaters()
                break;
            default:
                break;
        }
        console.log('value : ', value.value)
    }

    const syncInTheaters = async () => {
        const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Replace with your TMDb API key
        const BASE_URL = process.env.NEXT_PUBLIC_TMDB_HOST;
        const REGION = "US"; // Optional, use your desired region.

        const response = await fetch(`${BASE_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&region=${REGION}`);
        const inTheatersData: ApiResponse = await response.json()
        const inTheaters = inTheatersData.results || []
        if (response.ok) {
            console.log('inTheaters : ', inTheaters)
            syncTrailers(inTheaters)
        }
        // console.log()

    }

    const syncForRent = async () => {
        const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Replace with your TMDb API key
        const BASE_URL = process.env.NEXT_PUBLIC_TMDB_HOST;
        const PROVIDER_ID = 8; // Netflix
        const REGION = "US";

        try {
            const rentResponse = await fetch(`${BASE_URL}discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_watch_providers=${PROVIDER_ID}&watch_region=${REGION}`);
            const rentsData: ApiResponse = await rentResponse.json()
            const rents = rentsData.results || []
            if (rentResponse.ok) {
                syncTrailers(rents)
            }
            // console.log('rentsData : ', rentsData)
        } catch (error) {
            console.log('err : ', error)
        }
    }

    const syncOnTv = async () => {
        try {
            // GET https://api.themoviedb.org/3/discover/tv?api_key=YOUR_API_KEY&language=en-US&sort_by=popularity.desc&with_watch_providers=8&watch_region=US
            const moviesResponse = await fetch(`${process.env.NEXT_PUBLIC_TMDB_HOST}discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&with_watch_providers=8&watch_region=US`);
            const moviesData: ApiShowResponse = await moviesResponse.json()
            const movies = moviesData.results || [];
            console.log('movies : ', movies)
            // console.log('syncOnTv ', movies)
            syncTrailersForTv(movies)
        } catch (error) {
            console.log('err : ', error)
        }
    }
    const syncStreaming = async () => {
        try {
            // GET https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY&language=en-US&sort_by=popularity.desc&with_watch_providers=8&watch_region=US
            const moviesResponse = await fetch(`${process.env.NEXT_PUBLIC_TMDB_HOST}discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&with_watch_providers=8&watch_region=US`);
            const moviesData: ApiResponse = await moviesResponse.json()
            const movies = moviesData.results || [];
            syncTrailers(movies)
            console.log('syncStreaming : ', movies)
        } catch (error) {
            console.log('err : ', error)
        }
    }

    const syncPopular = async () => {
        try {
            const moviesResponse = await fetch(`${process.env.NEXT_PUBLIC_TMDB_HOST}movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
            const moviesData: ApiResponse = await moviesResponse.json()
            const movies = moviesData.results || [];
            syncTrailers(movies)
            // console.log('movies : ', movies)
        } catch (error) {
            console.log('err : ', error)
        }
    }

    const syncTrailersForTv = async (shows: Show[]) => {
        console.log('show : ', shows)
        try {
            const trailers: Trailers[] = (await Promise.all(
                shows.map(async (show) => {
                    try {
                        const videoResponse = await fetch(`${process.env.NEXT_PUBLIC_TMDB_HOST}movie/${show.id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
                        const videoData = await videoResponse.json();
                        if (videoResponse.ok) {

                            // console.log('videoData : ', videoData)
                            if (videoData.results.length > 0) {

                                const trailer = videoData.results.find(
                                    (video: Video) => video.type === "Trailer" && video.site === "YouTube"
                                );
                                if (trailer) {
                                    return {
                                        title: show.name,
                                        trailer_url: `https://www.youtube.com/watch?v=${trailer.key}`,
                                        backdrop_path: show.backdrop_path
                                    };
                                }
                                // console.log('trailer : ', trailer)
                            }
                        }
                    } catch (error) {
                        console.log('error : ', error)
                    }
                })
            )).filter((item) => item !== undefined)
            console.log('trailers : ', trailers)
            setTrailers(trailers)
        } catch (error) {
            console.log('error : ', error)
        }
    }

    const syncTrailers = async (movies: Movie[]) => {
        try {
            // console.log('data : ',data)
            const trailers: Trailers[] = (await Promise.all(
                movies.map(async (movie) => {
                    try {

                        const videoResponse = await fetch(`${process.env.NEXT_PUBLIC_TMDB_HOST}movie/${movie.id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
                        const videoData = await videoResponse.json();
                        // console.log('videoData : ',videoData)
                        const trailer = videoData.results.find(
                            (video: Video) => video.type === "Trailer" && video.site === "YouTube"
                        );
                        // console.log('titleeeeeee : ', movie.name)
                        // console.log('trailer : ', videoData.results)
                        if (trailer) {
                            return {
                                title: movie.title || movie.name,
                                trailer_url: `https://www.youtube.com/watch?v=${trailer.key}`,
                                backdrop_path: movie.backdrop_path
                            };
                        } else {
                            return {
                                title: movie.title || movie.name,
                                trailer_url: "",
                                backdrop_path: movie.backdrop_path
                            };
                            // console.log('aaa')
                        }
                    } catch (error) {
                        console.log('error : ', error)
                        return { title: movie.title, trailer_url: "", backdrop_path: movie.backdrop_path };
                    }

                    // return null; // No trailer available
                })
            )).filter((trailer): trailer is Trailers => trailer !== null);
            setTrailers(trailers)
            // console.log('trailers : ', trailers)
        } catch (error) {
            console.log('err : ', error)
        }
    }



    // console.log('trailers : ', trailers)

    return (
        <div className="w-full">
            <div className="2xl:max-w-[1280px] mx-auto h-auto lg:flex justify-center-center flex-col" >
                <div className="flex gap-4 lg:px-10 xl:px-10 2xl:px-10 px-4 py-6">
                    <p className={`${oswald.className} text-2xl`}>

                        Latest Trailer
                    </p>


                    <Selector data={selectorArr} onChange={handleChange()} />
                </div>
                <div className="h-[13.5rem] ">

                    <div className="w-full flex overflow-x-auto flex-nowrap space-x-5 lg:px-10 xl:px-10 2xl:px-10 px-4">
                        {
                            trailers.length < 1 &&
                            Array.from({ length: 20 }).map((_, y: number) => (
                                <div key={y} className="w-72 flex-shrink-0 space-y-2">
                                    <div className="relative h-40 bg-slate-100 rounded-md animate-pulse flex items-center justify-center">
                                        <PhotoIcon className="size-6" />
                                    </div>
                                    <div className="h-14 space-y-2">
                                        <div className="h-2 bg-slate-100 rounded-md animate-pulse" />
                                        <div className="h-2 bg-slate-100 rounded-md animate-pulse" />
                                    </div>
                                </div>
                            ))
                        }
                        {trailers.length > 0 &&
                            trailers.map((data, y) => (
                                <div key={y} className="w-72 flex-shrink-0">
                                    <div className="relative h-40">
                                        <Image
                                            priority
                                            src={`https://image.tmdb.org/t/p/w355_and_h200_smart${data.backdrop_path}`} // Replace with your dynamic poster path
                                            alt="Movie Poster"
                                            fill
                                            style={{ objectFit: "cover" }}
                                            className="object-cover rounded-md"
                                        />
                                    </div>
                                    <div className="h-14">
                                        <p className={`${poppins} font-semibold line-clamp-2`}>

                                            {data.title}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}